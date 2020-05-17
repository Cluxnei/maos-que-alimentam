import React, {useEffect} from 'react';
import {resetNavigation} from "../constants/Utils";

export default ({navigation, route}) => {
    useEffect(() => {
        let mount = true;
        const {reset} = route.params;
        if (reset && mount) {
            return resetNavigation({navigation});
        }
        return () => mount = false;
    }, []);
    return (
        <>
        </>
    );
};