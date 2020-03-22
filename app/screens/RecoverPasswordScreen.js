import React, {useEffect, useState} from 'react';
import Loading from '../components/Loading';
import * as S from '../styles/Login';

export default () => {
    //#region states
    const [isPerformingAnyAction, setIsPerformingAnyAction] = useState(false);
    //#endregion
    //#region methods
    const init = () => {
        setIsPerformingAnyAction(true);
    };
    //#endregion
    useEffect(init);
    //#region render
    if (isPerformingAnyAction) {
        return (<Loading />);
    }
    return (
        <S.Container>

        </S.Container>
    );
    //#endregion
};
