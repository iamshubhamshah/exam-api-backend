const mongoose = require('mongoose');   //{connect}
const Student = require('../models/StudentModel');


//Below API posts the data from the form body
const createPost = async (req, res) => {

    console.log(req.file);

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
            // address: req.body.address,
            //Added on 7 nov

            houseNumber: req.body.houseNumber,
            cityTownVillage: req.body.cityTownVillage,
            addressBlock: req.body.addressBlock,
            addressDistrict: req.body.addressDistrict,
            addressState: req.body.addressState,

            //^^^^^^^^^^^^^
            district: req.body.district,
            block: req.body.block,
            school: req.body.school,
            schoolCode: req.body.schoolCode,
            grade: req.body.grade,


            //added on 7 nov
            previousClassAnnualExamPercentage: req.body.previousClassAnnualExamPercentage,

            //^^^^^^^^^^^^^^^^^^^^^^^^^




            image: req.file ? req.file.originalname : null,
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
            verificationRemark: req.body.verificationRemark,
            verifiedBy: req.body.verifiedBy,
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
//... Below api deletes the data on the basis of _id key in the db.

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

            // address: req.body.address,
            //Added on 7 nov

            houseNumber: req.body.houseNumber,
            cityTownVillage: req.body.cityTownVillage,
            addressBlock: req.body.addressBlock,
            addressDistrict: req.body.addressDistrict,
            addressState: req.body.addressState,

            //^^^^^^^^^^^^^



            district: req.body.district,
            block: req.body.block,
            school: req.body.school,
            grade: req.body.grade,

                        //added on 7 nov
                        previousClassAnnualExamPercentage: req.body.previousClassAnnualExamPercentage,

                        //^^^^^^^^^^^^^^^^^^^^^^^^^

            image: req.file ? req.file.originalname : undefined,
            
            
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
// now below api can update the data based on id.

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
            // address: req.body.address,
            //Added on 7 nov

            houseNumber: req.body.houseNumber,
            cityTownVillage: req.body.cityTownVillage,
            addressBlock: req.body.addressBlock,
            addressDistrict: req.body.addressDistrict,
            addressState: req.body.addressState,

            //^^^^^^^^^^^^^



            district: req.body.district,
            block: req.body.block,
            school: req.body.school,
            grade: req.body.grade,

                    //added on 7 nov
                    previousClassAnnualExamPercentage: req.body.previousClassAnnualExamPercentage,

                    //^^^^^^^^^^^^^^^^^^^^^^^^^


            
            image: req.file ? req.file.originalname : undefined,
            imageUrl:req.body.imageUrl,
            isRegisteredBy: req.body.isRegisteredBy,
            isVerified: req.body.isVerified,
            verifiedBy: req.body.verifiedBy,
            verificationRemark: req.body.verificationRemark,
            
            // verifiedBy: req.body.verifiedBy,


            
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

//Below is the patch api for verfiying student's data.

patchPostById = async (req, res) => {
    try {
        const id = req.params.id;

        // Find the document by ID
        const existingDocument = await Student.findById(id);
        
        if (!existingDocument) {
            return res.status(404).json({ message: "No Document found" });
        }

        // Prepare updated fields
        const updatedFields = {};

        if (req.body.verificationRemark !== undefined) {
            if (Array.isArray(req.body.verificationRemark)) {
                updatedFields.verificationRemark = req.body.verificationRemark.join(", ");
            } else {
                updatedFields.verificationRemark = req.body.verificationRemark;
            }
        }

        if (req.body.isVerified !== undefined) {
            updatedFields.isVerified = req.body.isVerified;
        }

        if (req.body.verifiedBy !== undefined) {
         updatedFields.verifiedBy = req.body.verifiedBy;
        }

        // Update the document
        const result = await Student.updateOne(
            { _id: id },
            { $set: updatedFields }
        );

        // Always respond with success if the document is found and updated
        res.status(200).json({
            message: "Student Updated Successfully",
            updatedFields
        });
        
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Error updating the document",
            error,
        });
    }
};

//Below api is the patch api for updating the student's admit card download status.

patchDownloadAdmitCardById = async (req, res) => {
    console.log('i am inside patch')
    try {
        const id = req.params.id;
        const { gradeForDynamicallyUpdatingResultStatusInDb } = req.body; // Access the values from req.body


        //find the document by id
        const existingDocument = await Student.findById(id);

        if (!existingDocument) {
            return res.status(404).json ({message: "No Document Found"});
        }

        console.log(gradeForDynamicallyUpdatingResultStatusInDb);
        console.log(id);

      
        //Update the document
        if (gradeForDynamicallyUpdatingResultStatusInDb === 8) {
            console.log('i am in a if block')
            const result = await Student.updateOne (
                {_id: id},
                
                {$set:{
                    
    
                    // admitCard3: req.body.admitCard3,

                    admitCard3: true,

                    resultStatus2: true
                }}
            );
        } else {
            console.log('i am in a else block')

            const result = await Student.updateOne (
                {_id: id},
                {$set:{
                    
    
                    //admitCard1: req.body.admitCard1,
                    //resultStatus1: true,
                    admitCard2: true
                }}
            );

        }
        
        //Always respond with success if the document is found and updated

        res.status (200).json({
            message: "Admit Card or Certificate Download Succesfully",
            //data: req.body.admitCard1,
            data: req.body.resultStatus2,
        })

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Eroor downloading admit card",
            error,
        })
        
    }
}


//__________________________________________________________________________________________



patchAttendanceById = async (req, res) => {

    console.log('i am insdie controller')
    try {
        const {srn} = req.params;
        console.log(srn)
        const {  isPresentInL3Examination } = req.body; // Access the values from req.body
            console.log(isPresentInL3Examination);

        //find the document by id
        const existingDocument = await Student.find({srn: srn});

        if (!existingDocument) {
            return res.status(404).json ({message: "No Document Found"});
        }

       
        console.log(srn);

      
        //Update the document
       
         
            const result = await Student.updateOne (
                {srn: srn},
                
                {$set:{
                    
    
                    // admitCard3: req.body.admitCard3,

                    isPresentInL3Examination: isPresentInL3Examination,

                   
                }}
            );
        
        
        //Always respond with success if the document is found and updated

        res.status (200).json({
            message: "Attendance Updated Successfull",
            data: existingDocument,
        })

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Eroor Updating Attendance",
            error,
        })
        
    }
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
    patchPostById,
    patchDownloadAdmitCardById,
    patchAttendanceById

}