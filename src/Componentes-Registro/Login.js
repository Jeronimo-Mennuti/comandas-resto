import React from 'react';

function Login() {

    return (
        <form >
            <div className='input'>
                
                <input type="text" placeholder='Usuario'/>
            </div>
            <div className='input'>
                
                <input type="password" placeholder='Contraseña'/>
            </div>
            <button type="submit">Iniciar sesión</button>
        </form>
    );
}

export default Login;
