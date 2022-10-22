import { Router } from "express";
import ComboCtl from "../Controller/ComboCtl.js";

const {GetComboById, GetCombos, CreateCombo, DelCombo, UpdateCombo} = new ComboCtl();

const comboRouter = Router()

comboRouter.get("/", GetCombos)

comboRouter.post("/", CreateCombo)

comboRouter.route("/:id")
    .get(GetComboById)
    .delete(DelCombo)
    .put(UpdateCombo)


export default comboRouter