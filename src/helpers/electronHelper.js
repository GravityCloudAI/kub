import customAxios from "../axiosi"

export const execElectronCommand = async (cmd, shell = "false") => {
    try {
        const response = await customAxios.get(`http://localhost:51742/execute?cmd=${cmd}&shellEnv=${shell}`)
        return response
    }
    catch (err) {
        console.log(err)
        return null
    }
}