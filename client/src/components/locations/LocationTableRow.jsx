/* eslint-disable react/prop-types */
export function LocationTableRow({ name, img, country, city, street, number, zip, linkVisibility }) {
    return (
        <tr>
            <th scope="row">1</th>
            <td>
                <img src={img} alt={name} style={{ maxWidth: '4rem', maxHeight: '3rem' }} />
            </td>
            <td>{name}</td>
            {linkVisibility ? <td>{img}</td> : null}
            <td>{country}</td>
            <td>{city}</td>
            <td>{street}</td>
            <td>{number}</td>
            <td>{zip}</td>
            <td>
                <button className="btn btn-small btn-danger">Delete</button>
            </td>
        </tr>
    );
}