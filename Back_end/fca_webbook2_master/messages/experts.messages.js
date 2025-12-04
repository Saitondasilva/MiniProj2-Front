 module.exports = {
 success: {
        s0: {
            code: "expertsCreated",
            http: 201,
            type: "success"
        },
        s1: {
            http: 200,
            code: "expertsUpdated",
            type: "success"
        },
        s2: {
            http: 200,
            code: "expertsFound",
            type: "success"
        },
        s3: {
            http: 200,
            code: "expertsDeleted",
            type: "success"
        },
        s4: {
            http: 200,
            code: "Deactivated",
            type: "success"
        },
        s5: {
            http: 204,
            code: "NoQuizzes",
            type: "success"
        },
        s6: {
            http: 200,
            code: "Activated",
            type: "success"
        }
    },
    error: {
        e0: {
            http: 404,
            code: "expertsNotFound",
            type: "error"
        }
    }
}