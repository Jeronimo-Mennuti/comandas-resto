import React from 'react';

function NewResto() {
    return (
        <div>
            <h1>Crear nuevo restaurante</h1>
            <h4>Completa los siguientes datos para continuar:</h4>
            <form>
                <div className='input'>

                    <input type="text" placeholder='Nombre' />
                </div>
                <div className='input'>

                    <input type="text" placeholder='Moneda' />
                </div>
                <div className='input'>

                    <input type="text" placeholder='Descripcion' />
                </div>
                <div className='input'>

                    <input type="text" placeholder='Correo Electronico' />
                </div>
                <div className='input'>

                    <input type="text" placeholder='Sitio Web' />
                </div>
                <div className='input'>

                    <input type="text" placeholder='Telefono' />
                </div>
                <div className='input'>

                    <input type="text" placeholder='Direccion' />
                </div>
                <div className='input'>

                    <input type="text" placeholder='Pais' />
                </div>
                <div className='input'>

                    <input type="text" placeholder='Ciudad' />
                </div>
                <button type="submit">Crear Nuevo Restaurante</button>
            </form>
        </div>
    )
}

export default NewResto
