const express = require('express');
const app = express();
const PORT = process.env.PORT || 4000;

let arr = [];
app.post('/create', (req,res) => {
    try {
        const { name, role, salary, company } = req.body
        // checking all values is given.
        if(name && role && salary && company) {
            // checking all values is should not be typed as a null
            if(name !== 'null' && role !== 'null' && Number(salary) >= 0 && company !== 'null') {
                // find id in array
                let id = arr.length === 0 ? 1 : arr[arr.length - 1]?.id + 1;
                let createEmployee = {
                    id : id,
                    name : name,
                    role : role,
                    salary : salary,
                    company : company
                }
                arr = [ ...arr, createEmployee ];
                return res.status(200).json('Successfully created.');
            }
            else {
                return res.status(400).send('Invalid Input');
            }
        }
        else {
            return res.status(400).send('Input is not given.');
        }
    }
    catch(e) {
        return res.status(404).send('Error Invalid input.')
    }
})

app.delete('/delete/:id', (req,res) => {
    try {
        const { id } = req.params
        // if array having more than 1 value
        if(arr.length > 1) {            
            arr = arr.filter((item) => item.id !== Number(id));
            arr = arr.map((item,index) => ({
                ...item,   
                id : index + 1 
            }))
            return res.status(200).json('Successfull deleted.');
        }
        else {
            arr = arr.filter((item) => item.id !== Number(id))
            return res.status(200).json('Successfull deleted.')
        }
    }
    catch(e) {
        return res.status(404).send('Error Invalid input.')
    }
})

app.put('/update/:id', (req,res) => {
    try {
        const { id } = req.params        
        const { name, role, salary, company } = req.body       
        // checking all values is given.
        if(name && role && salary && company) {
            // checking all values is should not be typed as a null
            if(name !== 'null' && role !== 'null' && Number(salary) >= 0 && company !== 'null') {
                let index = arr.findIndex((item) => item.id === Number(id))
                let obj = {
                    id : Number(id),
                    name : name,
                    role : role,
                    salary : salary,
                    company : company
                }
                if(index > -1) {
                    arr[index] = obj;
                    return res.status(200).json('Successfull updated.');
                }
                else {
                    return res.status(400).json('No Data.');
                }
            }
            else {                    
                return res.status(400).send('Invalid input');
            }
        }
        else {
            return res.status(400).send('Input is not given')
        }                    
    }
    catch(e) {
        return res.status(404).send('Error Invalid input');
    }
})

app.get('/', (req,res) => {
    try {
        return res.status(200).json(arr);
    }
    catch(e) {
        return res.status(404).send('Error')
    }
})

app.listen(PORT, console.log(`Server is listening Port : ${PORT}`));
