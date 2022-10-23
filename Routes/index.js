import userRouter from "./user.js"
import productRouter from "./product.js"
import authRouter from "./Auth.js"
import categoryRouter from "./Category.js"
import comboRouter from "./Combo.js"
import uploadRouter from "./Upload.js"
import roleRouter from "./UserRole.js"

const defineRouter = (app) => {  
    app.use("/api/user", userRouter) 
    app.use("/api/role", roleRouter) 
    app.use("/api/product", productRouter) 
    app.use("/api/auth", authRouter) 
    app.use("/api/category", categoryRouter) 
    app.use("/api/combo", comboRouter) 
    app.use("/api/upload", uploadRouter) 
}

export default defineRouter