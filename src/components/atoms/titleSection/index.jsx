import React from "react";
import { Link } from "react-router-dom";

export default function TitleSection(props) {
    
    const { title, titleMore, lihatSemua } = props;

    return (
        <div className="flex items-center pt-10 pb-5 justify-between">
            <h1 className="text-lg font-bold">{title}</h1>
            <p className="text-sm cursor-pointer" to="/products"
                onClick={lihatSemua}
            >
                {titleMore}
            </p>

            {/* <Link className="text-sm" to="/products" >{titleMore}</Link> */}
        </div>
    );
}