module.exports = {
    rules: {
        "add": {
            meta: {
                docs: {
                    description: "所有函数都用try-catch包裹",
                },
                fixable: 'code'
            },
            create: function (context) {
                // rule implementation ...

                // api 初始化逻辑
                // visitor AST
                return {
                    FunctionDeclaration(node) {
                        const functionName = node.id.name;
                        const blockStatementBody = node.body.body;
                        const hasBody = blockStatementBody.length !== 0;

                        if (hasBody) {
                            const startsWithTry = blockStatementBody[0].type === 'TryStatement';
                            const hasCatch = !!blockStatementBody[0].handler;

                            if (!startsWithTry) {
                                context.report({
                                    node,
                                    message: `function ${functionName} must be embraced by try statement`,
                                    fix(fixer) {
                                        const isNeedFix = context.options[0];
                                        if (isNeedFix === false) {
                                            console.log('** options **', functionName, context.options)
                                            return fixer.insertTextBeforeRange(blockStatementBody[0].range, '');
                                        }
                                        return [
                                            fixer.insertTextBeforeRange(blockStatementBody[0].range, 'try {\n'),
                                            fixer.insertTextAfterRange(blockStatementBody[blockStatementBody.length - 1].range, '\n} catch(err) {\n}')
                                        ]
                                    }
                                })
                            } else if(!hasCatch) {
                                context.report({
                                    node,
                                    message: 'function ${functionName} must be embraced by try statement'
                                })
                            }
                        }
                    }
                }
            }
        }
    }
};