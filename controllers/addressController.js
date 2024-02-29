const Address=require('../models/address')

module.exports={

    async findByUser(req,res,next){
        try {
            
            const id_user=req.params.id_user
            console.log(id_user);
            const data=await Address.findByUser(id_user)
            return res.status(200).json(data)
        } catch (error) {

            return res.status(501).json({
                message:'Hubo un error al traer las direcciones',
                error:error,
                success:false
            })
            
        }
    },
    async create(req,res,next){
        try {
            const address=req.body
            const data=await Address.create(address)
            console.log();

            return res.status(200).json({
                success:true,
                message:'La direccion se creo correctamente',
                data:data.id
            })
        } catch (error) {
            console.log(error);
            return res.status(501).json({
                success:false,
                message:'Ha ocurrido un error con la direccion',

            })
        }
    }
}