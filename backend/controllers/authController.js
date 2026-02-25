const db = require('../db/knex')
const bcrypt = require('bcrypt'); //12345678
const jwt = require("jsonwebtoken");//สร้าง token

exports.login = async (req, res) => {
    const { email, password } = req.body;
    console.log("1]. Login Req.body:", req.body);
    try {
        const user = await db('users').where('email', email).first();
        console.log(user);
        if (!user) {
            return res.status(401).json({message: "Invalid email or password"})
        }
        const passwordMatch = await bcrypt.compare(password, user.password_hash);
        if (!passwordMatch) {
            return res.status(401).json({ message: "Invalid username or password" });
        }
        const token = jwt.sign(
            {id: user.id,name_th: user.name_th, email: user.email,role: user.role, dept_id: user.department_id ,org_id: user.org_group_id,},
            process.env.JWT_SECRET || "testing123" ,
            {expiresIn:process.env.JWT_EXPIRES_IN || "1h"}
        )
        console.log(token)
        res.json({
        message:"Login successful",
        token: token,
        user:{
            id: user.id,
            email: user.email,
            name_th: user.name_th,
            role: user.role,
            dept_id: user.department_id,
        },
    })
    }   catch(error){
        res.status(500).json({
            message: error.message,
        })
    }
}

exports.register = async (req, res) => {
    const { email, name, name_th, password, department_id, org_group_id } = req.body;
    const displayName = name || name_th;
    if (!email || !displayName || !password) {
        return res.status(400).json({ message: 'email, name/password are required' });
    }

    try {
        const exists = await db('users').where({ email }).first();
        if (exists) {
            return res.status(409).json({ message: 'Email already exists' });
        }

        const password_hash = await bcrypt.hash(password, 10);
        const [id] = await db('users').insert({
            email,
            password_hash,
            name_th: displayName,
            role: 'evaluatee',
            department_id: department_id || null,
            status: 'active',
            org_group_id: org_group_id || null,
        });

        const user = await db('users')
            .select('id', 'email', 'name_th', 'role', 'department_id')
            .where({ id })
            .first();

        return res.status(201).json({ message: 'Register successful', user });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
