

const TableComponentItem = ({id, firstname, lastname, phone, email, image}) => {
    return (
        <tr>
            <td scope="row">{id}</td>
            <td>{firstname}</td>
            <td>{lastname}</td>
            <td>{phone}</td>
            <td>{email}</td>
            <td>
                <img width="60" height="60" src={'/images/' + image}/>
            </td>
        </tr>
    );
}

export default TableComponentItem;