import React from "react";
import { useNavigate } from "react-router-dom";

function TopMenu( { title } ) {
    const navigate = useNavigate();

    const goBack = () => {
        navigate(-1);
    };

    return(
        <div className="flex items-center justify-between p-2 shadow-md h-16">
            <button onClick={goBack} className="text-lg">
                <div className="px-3">
                    <img
                        src="/web/images/ico/back.png"
                        alt="back_btn"
                        className="w-2"
                    />
                </div>
            </button>
            <div className="text-lg font-semibold">{title}</div>
            <div className="w-8"></div> 
            {/* △나중에 개조할 때 무언가의 요소를 넣을 수 있음 */}
        </div>
    );
}

export default TopMenu;