const { RuleTester } = require('eslint');
const { rules } = require('../index');

const ruleTester = new RuleTester();

ruleTester.run('try-statement', rules.add, {
    valid: [
        {
            name: 'empty body',
            code: 'function fetchUsers() {}'
        },
        {
            name: 'empty body && starts with try statement',
            code: 'function fetchUsers() { try {} catch(err) {} }'
        },
        {
            name: 'starts with try statement',
            code: 'function fetchUsers() { try { var timeout = 1000; } catch(err) {} }'
        }
    ],
    invalid: [
        {
            name: 'has no try statement',
            code: 'function fetchUsers1() { var timeout = 1000; var retry = 3; }',
            output: 'function fetchUsers1() { try {\nvar timeout = 1000; var retry = 3;\n} catch(err) {\n} }',
            errors:[{
                message: 'function fetchUsers must be embraced by try statement'
            }]
        },
        {
            name: 'do not fix',
            code: 'function fetchUsers2() { var timeout = 1000; var retry = 3; }',
            options: [false],
            output: 'function fetchUsers2() { var timeout = 1000; var retry = 3; }',
            errors:[{
                message: 'function fetchUsers must be embraced by try statement'
            }]
        }

    // ,
    //     {
    //         name: 'function has no catch statement',
    //         code: 'function fetchUsers() { try { var timeout = 1000; } }',
    //         errors:[{
    //             message: 'function fetchUsers must has catch statement'
    //         }]
    //     }
    ]
})