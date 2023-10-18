export default function(){
    
    const urlImagen = (buffer)=>{
        // Ejemplo de un búfer de imagen (arreglo de bytes)
        const imageBuffer = buffer
        // Convertir el búfer en una URL de datos
        const dataURL = `data:image/jpeg;base64,${btoa(String.fromCharCode.apply(null, imageBuffer))}`;
        return dataURL 
    }
    

    return {
        urlImagen
    }
}