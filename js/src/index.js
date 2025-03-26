const app = require('./app');

app.listen(app.get('port'), ()=>{
    console.log("Servidor conectado existosamente", app.get("port"));
});