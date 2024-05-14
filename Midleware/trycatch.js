const tryCatchMidileware = (tryCatchHandler) => {
    return async (req, res , next) => {
        try {
            await tryCatchHandler(req, res , next)
            
        } catch (error) {
            res.status(500).json({
                status: "failure",
                message: "error",
                error_msg: error.message,
            })
    
        }
    }
}


export default tryCatchMidileware