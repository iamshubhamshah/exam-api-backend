const mongoose = require('mongoose');
const Student = require('../models/StudentModel');

// Aggregation for 8th Class Dashboard with sorting
const GetDataFor8Dashboard = async (req, res) => {
    try {
        const students = await Student.aggregate([
            {
                $match: {
                    isRegisteredBy: { $ne: "" },
                    grade: "8"
                }
            },
            {
                $group: {
                    _id: {
                        district: "$district",
                        block: "$block",
                        school: {
                            $cond: {
                                if: { $eq: ["$schoolCode", ""] },
                                then: "$school",
                                else: "Other Schools"
                            }
                        }
                    },
                    count: { $sum: 1 },
                    admitCardCount: { $sum: { $cond: ["$admitCard1", 1, 0] } },
                    admitCardCount2: { $sum: { $cond: ["$admitCard2", 1, 0] } },
                    admitCardCount3: { $sum: { $cond: ["$admitCard3", 1, 0] } },
                    resultStatusCount1: { $sum: { $cond: ["$resultStatus1", 1, 0] } },
                    resultStatusCount2: { $sum: { $cond: ["$resultStatus2", 1, 0] } },
                    resultStatusCount3: { $sum: { $cond: ["$resultStatus3", 1, 0] } },
                    qualifiedCount1: { $sum: { $cond: ["$isQualifiedL1", 1, 0] } },
                    qualifiedCount2: { $sum: { $cond: ["$isQualifiedL2", 1, 0] } },
                    qualifiedCount3: { $sum: { $cond: ["$isQualifiedL3", 1, 0] } }
                }
            },
            {
                $sort: { "_id.school": 1, count: -1 }
            },
            {
                $group: {
                    _id: {
                        district: "$_id.district",
                        block: "$_id.block"
                    },
                    schools: {
                        $push: {
                            school: "$_id.school",
                            count: "$count",
                            admitCardCount: "$admitCardCount",
                            admitCardCount2: "$admitCardCount2",
                            admitCardCount3: "$admitCardCount3",
                            resultStatusCount1: "$resultStatusCount1",
                            resultStatusCount2: "$resultStatusCount2",
                            resultStatusCount3: "$resultStatusCount3",
                            qualifiedCount1: "$qualifiedCount1",
                            qualifiedCount2: "$qualifiedCount2",
                            qualifiedCount3: "$qualifiedCount3"
                        }
                    },
                    blockCount: { $sum: "$count" },
                    totalAdmitCardCount: { $sum: "$admitCardCount" },
                    totalAdmitCardCount2: { $sum: "$admitCardCount2" },
                    totalAdmitCardCount3: { $sum: "$admitCardCount3" },
                    totalResultStatusCount1: { $sum: "$resultStatusCount1" },
                    totalResultStatusCount2: { $sum: "$resultStatusCount2" },
                    totalResultStatusCount3: { $sum: "$resultStatusCount3" },
                    totalQualifiedCount1: { $sum: "$qualifiedCount1" },
                    totalQualifiedCount2: { $sum: "$qualifiedCount2" },
                    totalQualifiedCount3: { $sum: "$qualifiedCount3" }
                }
            },
            {
                $sort: { "_id.block": 1, blockCount: -1 }
            },
            {
                $group: {
                    _id: "$_id.district",
                    blocks: {
                        $push: {
                            block: "$_id.block",
                            blockCount: "$blockCount",
                            schools: "$schools",
                            totalAdmitCardCount: "$totalAdmitCardCount",
                            totalAdmitCardCount2: "$totalAdmitCardCount2",
                            totalAdmitCardCount3: "$totalAdmitCardCount3",
                            totalResultStatusCount1: "$totalResultStatusCount1",
                            totalResultStatusCount2: "$totalResultStatusCount2",
                            totalResultStatusCount3: "$totalResultStatusCount3",
                            totalQualifiedCount1: "$totalQualifiedCount1",
                            totalQualifiedCount2: "$totalQualifiedCount2",
                            totalQualifiedCount3: "$totalQualifiedCount3"
                        }
                    },
                    districtCount: { $sum: "$blockCount" },
                    totalAdmitCardCount: { $sum: "$totalAdmitCardCount" },
                    totalAdmitCardCount2: { $sum: "$totalAdmitCardCount2" },
                    totalAdmitCardCount3: { $sum: "$totalAdmitCardCount3" },
                    totalResultStatusCount1: { $sum: "$totalResultStatusCount1" },
                    totalResultStatusCount2: { $sum: "$totalResultStatusCount2" },
                    totalResultStatusCount3: { $sum: "$totalResultStatusCount3" },
                    totalQualifiedCount1: { $sum: "$totalQualifiedCount1" },
                    totalQualifiedCount2: { $sum: "$totalQualifiedCount2" },
                    totalQualifiedCount3: { $sum: "$totalQualifiedCount3" }
                }
            },
            {
                $sort: { districtCount: -1 }
            },
            {
                $project: {
                    _id: 0,
                    district: "$_id",
                    districtCount: 1,
                    blocks: 1,
                    totalAdmitCardCount: 1,
                    totalAdmitCardCount2: 1,
                    totalAdmitCardCount3: 1,
                    totalResultStatusCount1: 1,
                    totalResultStatusCount2: 1,
                    totalResultStatusCount3: 1,
                    totalQualifiedCount1: 1,
                    totalQualifiedCount2: 1,
                    totalQualifiedCount3: 1
                }
            }
        ]);

        res.status(200).json(students);

    } catch (error) {
        console.error("Error in GetDataFor8Dashboard:", error);
        res.status(500).json({ message: "Error fetching dashboard data", error });
    }
};

// Repeat the same structure with sorting for 10th Class Dashboard
const GetDataFor10Dashboard = async (req, res) => {
    try {
        const students = await Student.aggregate([
            {
                $match: {
                    isRegisteredBy: { $ne: "" },
                    grade: "10"
                }
            },
            {
                $group: {
                    _id: {
                        district: "$district",
                        block: "$block",
                        school: {
                            $cond: {
                                if: { $eq: ["$schoolCode", ""] },
                                then: "$school",
                                else: "Other Schools"
                            }
                        }
                    },
                    count: { $sum: 1 },
                    admitCardCount: { $sum: { $cond: ["$admitCard1", 1, 0] } },
                    admitCardCount2: { $sum: { $cond: ["$admitCard2", 1, 0] } },
                    admitCardCount3: { $sum: { $cond: ["$admitCard3", 1, 0] } },
                    resultStatusCount1: { $sum: { $cond: ["$resultStatus1", 1, 0] } },
                    resultStatusCount2: { $sum: { $cond: ["$resultStatus2", 1, 0] } },
                    resultStatusCount3: { $sum: { $cond: ["$resultStatus3", 1, 0] } },
                    qualifiedCount1: { $sum: { $cond: ["$isQualifiedL1", 1, 0] } },
                    qualifiedCount2: { $sum: { $cond: ["$isQualifiedL2", 1, 0] } },
                    qualifiedCount3: { $sum: { $cond: ["$isQualifiedL3", 1, 0] } }
                }
            },
            {
                $sort: { "_id.school": 1, count: -1 }
            },
            {
                $group: {
                    _id: {
                        district: "$_id.district",
                        block: "$_id.block"
                    },
                    schools: {
                        $push: {
                            school: "$_id.school",
                            count: "$count",
                            admitCardCount: "$admitCardCount",
                            admitCardCount2: "$admitCardCount2",
                            admitCardCount3: "$admitCardCount3",
                            resultStatusCount1: "$resultStatusCount1",
                            resultStatusCount2: "$resultStatusCount2",
                            resultStatusCount3: "$resultStatusCount3",
                            qualifiedCount1: "$qualifiedCount1",
                            qualifiedCount2: "$qualifiedCount2",
                            qualifiedCount3: "$qualifiedCount3"
                        }
                    },
                    blockCount: { $sum: "$count" },
                    totalAdmitCardCount: { $sum: "$admitCardCount" },
                    totalAdmitCardCount2: { $sum: "$admitCardCount2" },
                    totalAdmitCardCount3: { $sum: "$admitCardCount3" },
                    totalResultStatusCount1: { $sum: "$resultStatusCount1" },
                    totalResultStatusCount2: { $sum: "$resultStatusCount2" },
                    totalResultStatusCount3: { $sum: "$resultStatusCount3" },
                    totalQualifiedCount1: { $sum: "$qualifiedCount1" },
                    totalQualifiedCount2: { $sum: "$qualifiedCount2" },
                    totalQualifiedCount3: { $sum: "$qualifiedCount3" }
                }
            },
            {
                $sort: { "_id.block": 1, blockCount: -1 }
            },
            {
                $group: {
                    _id: "$_id.district",
                    blocks: {
                        $push: {
                            block: "$_id.block",
                            blockCount: "$blockCount",
                            schools: "$schools",
                            totalAdmitCardCount: "$totalAdmitCardCount",
                            totalAdmitCardCount2: "$totalAdmitCardCount2",
                            totalAdmitCardCount3: "$totalAdmitCardCount3",
                            totalResultStatusCount1: "$totalResultStatusCount1",
                            totalResultStatusCount2: "$totalResultStatusCount2",
                            totalResultStatusCount3: "$totalResultStatusCount3",
                            totalQualifiedCount1: "$totalQualifiedCount1",
                            totalQualifiedCount2: "$totalQualifiedCount2",
                            totalQualifiedCount3: "$totalQualifiedCount3"
                        }
                    },
                    districtCount: { $sum: "$blockCount" },
                    totalAdmitCardCount: { $sum: "$totalAdmitCardCount" },
                    totalAdmitCardCount2: { $sum: "$totalAdmitCardCount2" },
                    totalAdmitCardCount3: { $sum: "$totalAdmitCardCount3" },
                    totalResultStatusCount1: { $sum: "$totalResultStatusCount1" },
                    totalResultStatusCount2: { $sum: "$totalResultStatusCount2" },
                    totalResultStatusCount3: { $sum: "$totalResultStatusCount3" },
                    totalQualifiedCount1: { $sum: "$totalQualifiedCount1" },
                    totalQualifiedCount2: { $sum: "$totalQualifiedCount2" },
                    totalQualifiedCount3: { $sum: "$totalQualifiedCount3" }
                }
            },
            {
                $sort: { districtCount: -1 }
            },
            {
                $project: {
                    _id: 0,
                    district: "$_id",
                    districtCount: 1,
                    blocks: 1,
                    totalAdmitCardCount: 1,
                    totalAdmitCardCount2: 1,
                    totalAdmitCardCount3: 1,
                    totalResultStatusCount1: 1,
                    totalResultStatusCount2: 1,
                    totalResultStatusCount3: 1,
                    totalQualifiedCount1: 1,
                    totalQualifiedCount2: 1,
                    totalQualifiedCount3: 1
                }
            }
        ]);

        res.status(200).json(students);

    } catch (error) {
        console.error("Error in GetDataFor8Dashboard:", error);
        res.status(500).json({ message: "Error fetching dashboard data", error });
    }
};
module.exports = {
    GetDataFor8Dashboard,
    GetDataFor10Dashboard
};
