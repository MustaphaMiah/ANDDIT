import React from 'react';
import Malcolm from '../Assets/Images/Malcolm.jpeg';

function Profile() {
    // const [count, setCount] = useState(0)
    function sendLove() {
        alert("I love malcolm");
    }
    return (
        <div>
            <img style={{ height: '200px', width: '200px' }} src={Malcolm} alt="Logo" />
            <p>Name: Malcolm </p><p>Description: I am a dad and I love mi wee dad Jokes</p>
            <button onClick={sendLove}>SEND ME LOVE</button></div>
    )
}

export default Profile 