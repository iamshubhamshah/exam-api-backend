const mongoose = require('mongoose');   //{connect}
const Student = require('../models/StudentModel');


//Below API posts the data from the form body
const createPost = async (req, res) => {
    try {
        const post = new Student ({
            srn: req.body.srn,
            name: req.body.name,
            father: req.body.father,
            mother: req.body.mother,
            dob: req.body.dob,
            gender: req.body.gender,
            category: req.body.category,
            aadhar: req.body.aadhar,
            mobile: req.body.mobile,
            whatsapp: req.body.whatsapp,
            address: req.body.address,
            district: req.body.district,
            block: req.body.block,
            school: req.body.school,
            schoolCode: req.body.schoolCode,
            grade: req.body.grade,
            image: req.file ? req.file.filename:null,
            imageUrl: req.body.imageUrl,
            isRegisteredBy: req.body.isRegisteredBy,
            isVerified: req.body.isVerified,
            isVerifiedBy: req.body.isVerifiedBy,
            slipId: req.body.slipId, //generatest the dynamic acknowledgement id for the students.
            rollNumber: req.body.rollNumber,
            examType: req.body.examType,
            centerAllocation1: req.body.centerAllocation1,
            centerAllocation2: req.body.centerAllocation2,
            centerAllocation3: req.body.centerAllocation3,
            dateL1: req.body.dateL1,
            dateL2: req.body.dateL2,
            dateL3: req.body.dateL3,
            admitCard1: req.body.admitCard1,
            admitCard2: req.body.admitCard2,
            admitCard3: req.body.admitCard3,
            resultStatus1: req.body.resultStatus1,
            resultStatus2: req.body.resultStatus2,
            resultStatus3: req.body.resultStatus3,
            marksL1: req.body.marksL1,
            marksL2: req.body.marksL2,
            marksL3: req.body.marksL3,
            isQualifiedL1: req.body.isQualifiedL1,
            isQualifiedL2: req.body.isQualifiedL2,
            isQualifiedL3: req.body.isQualifiedL3,
        });
        const postData = await post.save();

        res.status(200).send({success: true, msg: 'Data posted Successfully',data: postData});
        
    } catch (error) {
        res.status(400).send({success:false, msg:error.message});
    }
}

const getPosts = async(req, res)=>{
    try {
        const students = await Student.find({});
        res.status(200).send({success:true, msg: 'Posts Data', data:students});
        
    } catch (error) {
        res.status(400).send({success: false, msg: error.message});
    }
}
//_____________________________________________________________________________________________



//Below API is being used to get data from the students collection by srn. It is being used as updating data and in the prefilled form functionlity. 
// ... using this api we get the prefilled data in the form.

const getPostsBySrn = async (req, res) => {
    try {
        // Extract SRN from request parameters
        const { srn } = req.params;

        // Find a student with the specified SRN
        const student = await Student.findOne({ srn: srn });

        if (!student) {
            return res.status(404).send({ success: false, msg: 'Student not found' });
        }

        res.status(200).send({ success: true, msg: 'Posts Data', data: student });

    } catch (error) {
        res.status(400).send({ success: false, msg: error.message });
    }
};
//_____________________________________________________________________________________________________



// Below Api is being used in RegistrationDashComponent to test the data for deleting data from db.
//... Below api deletes the data on the basis of _id key in the db

const deletePosts = async (req, res)=>{
    try {

        const id = req.params.id

        await Student.deleteOne({_id:id});
        res.status(200).send({success: true, msg: "Post deleted successfully"});

        
    } catch (error) {
        res.status(400).send({success: false, msg: error.message});
        
    }
}

//_______________________________________________________________________________________________



// Learnt and created below api. This api is supposed to update existing dta in db. In postman it is called PUT.
const updatePosts = async (req, res, next)=>{
    console.log(req.params.id);
    Student.findOneAndUpdate({_id:req.params.id}, {
        $set: {
            srn: req.body.srn,
            name: req.body.name,
            father: req.body.father,
            mother: req.body.mother,
            dob: req.body.dob,
            gender: req.body.gender,
            category: req.body.category,
            aadhar: req.body.aadhar,
            mobile: req.body.mobile,
            whatsapp: req.body.whatsapp,
            address: req.body.address,
            district: req.body.district,
            block: req.body.block,
            school: req.body.school,
            grade: req.body.grade,
            image: req.file ? req.file.filename : undefined,
            
            
        }
    })
    .then(result=>{
        res.status(200).json({
            updated_data: result
        })
    })
    .catch(error=>{
        console.log(error);
        res.status(500).json({
            error: error
        })
    })
}
//____________________________________________________________________________________________________


//PUT API
// Below API i learnt from many sources and finally created an PUT Api which updates the data on the matched srn in db. 
//... It has a short coming of, if the user wants to update his/her srn then he/she won't be able to...
//...because below api usese srn as the unique identifier for updating documents.

const updatePostsById = async (req, res, next)=>{
    console.log(req.params.id);
    const id = req.params.id
    Student.findOneAndUpdate({_id:id}, {
        $set: {
            srn: req.body.srn,
            name: req.body.name,
            father: req.body.father,
            mother: req.body.mother,
            dob: req.body.dob,
            gender: req.body.gender,
            category: req.body.category,
            aadhar: req.body.aadhar,
            mobile: req.body.mobile,
            whatsapp: req.body.whatsapp,
            address: req.body.address,
            district: req.body.district,
            block: req.body.block,
            school: req.body.school,
            grade: req.body.grade,
            image: req.file ? req.file.filename : undefined,
            imageUrl:req.body.imageUrl,
            isRegisteredBy: req.body.isRegisteredBy,
            
        }
    })
    .then(result=>{
        res.status(200).json({
            updated_data: result
        })
    })
    .catch(error=>{
        console.log(error);
        res.status(500).json({
            error: error
        })
    })
}
//__________________________________________________________________________________________

//Below is the way to export the module so that we can use it anywhere in our backend logics.

module.exports = {
    createPost,
    getPosts,
    deletePosts,
    updatePosts,
    updatePostsById,
    getPostsBySrn,

}