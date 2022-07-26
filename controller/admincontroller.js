const admin = require('../models/admin')
const bcrypt= require('bcryptjs')
const jwt=require('jsonwebtoken')


const adminregister = async(req,res)=>{
    try{
        let{ phone,email }=req.body;
       
         const adminExist= await admin.findOne({$or:[{email:email},{phone:phone}] });

            if(adminExist){
             return res.status(200).json({
                message :"admin already exists"});

         }else{
            const hashedPassword = await bcrypt.hash(req.body.password,10)
            const hashedCPassword = await bcrypt.hash(req.body.confirmpassword,10)
            const Admin = new admin ({
                name: req.body.name,
                phone: req.body.phone,
                email: req.body.email,
                password: hashedPassword,
                confirmpassword: hashedCPassword

            });

            const adminRegister = await Admin;
            if (adminRegister) {
                if (req.body.password === req.body.confirmpassword) {
                    let token = jwt.sign({ _id: req.body._id, userType: "ADMIN" }, 'verySecretValue', { expiresIn: '5hr' })
                    adminRegister.save()
                    return res.status(200).json({ message: "Admin registered successfully :) ", token });
                }
            }
        }
        res.json({
            data : adminregister
        })
    } catch (err) {
        console.log(err);
    }
}

const adminlogin = async(req,res)=>{
    var admin_name = req.body.admin_name
    var password = req.body.password

    await admin.findOne({ $or: [{ email: admin_name }, { phoneNo: admin_name }] })
    .then(Admin => {
        if (Admin) {
            bcrypt.compare(password, Admin.password, function(err, result) {
                if (err) {
                    res.json({ error: err })
                }
                if (result) {
                    let token = jwt.sign({ _id: req.body._id, userType: "ADMIN" }, 'verySecretValue', { expiresIn: '1hr' })
                    res.json({ message: 'Login Successful! :)', token })
                } else {
                    res.json({ error: 'Password incorrect :(' })
                }
            })
        } else {
            res.json({ error: 'Admin not found!!' })
        }
    })
}

module.exports={adminregister,
                adminlogin
 }