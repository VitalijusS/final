/* eslint-disable react/prop-types */

import { useState } from "react";
import { LocationTableRow } from "./LocationTableRow";

export function AdminLocationsList({ locations }) {
    const [linkVisibility, setLinkVisibility] = useState(false);
    return (
        <div className="container px-4 py-5">
            <button className="btn btn-info" onClick={() => setLinkVisibility(prev => !prev)}>Links</button>
            <div className="row row-cols-1 row-cols-lg-3 align-items-stretch g-4 py-5">
                <table className="table table-bordered border-primary">
                    <thead className="table-dark">
                        <tr>
                            <th></th>
                            <th>Img</th>
                            <th>Name</th>
                            {linkVisibility ? <th>Link</th> : null}
                            <th>Country</th>
                            <th>City</th>
                            <th>Street</th>
                            <th>Number</th>
                            <th>Zip</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>{locations.map((location, index) => <LocationTableRow key={index} {...location} linkVisibility={linkVisibility} />)}</tbody>
                </table>
            </div>
        </div>
    )
}