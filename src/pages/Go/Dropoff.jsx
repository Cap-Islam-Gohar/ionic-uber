import { useEffect } from "react";

const Dropoff = () => {

    useEffect(() => {
        console.log('ok');
    }, []);

    return (<>
        <h1>dropoff</h1>
    </>);
};

export default Dropoff;
