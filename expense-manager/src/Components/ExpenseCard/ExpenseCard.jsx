import './ExpenseCard.scss';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Popup, Confirm } from "semantic-ui-react";

const ExpenseCard = ({ showIcon,deleteExpense, expense, index }) => {
    let month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let tem_date = expense.dateAndTime;
    let year = tem_date.substr(0, 4);
    let mon = parseInt(tem_date.substr(5, 2));
    let date = tem_date.substr(8, 2);
    let time = tem_date.substr(11, 5)
    let new_date = `${date} ${month[mon-1]} ${year}, ${time}`;
    const [open, setOpen] = useState(false);
    const history = useHistory();
    const handleDeleteExpense = () => {
        setOpen(false);
        deleteExpense(expense.id);
    }
    return (
        <div className="expense-card" key={index}>
            <div className="date-icon">
                <div><b>Date</b>: {new_date}</div>
                {showIcon && <div className="icon-block-div">
                    <Popup
                        content="edit"
                        trigger={
                            <img
                                className="icon-btn"
                                src={"/assets/edit.png"}
                                onClick={() => {
                                    history.push({
                                        pathname: 'edit-expense',
                                        data:expense // your data array of objects
                                    })
                                }}
                                alt=""
                            />
                        }
                    />
                    <Popup
                        content="delete"
                        trigger={
                            <img
                                className="icon-btn"
                                src={"/assets/delete.png"}
                                onClick={() => setOpen(true)}
                                alt=""
                            />
                        }
                    />
                </div>}
                <Confirm
                    open={open}
                    header='Are You Sure You Want to Delete This Expense?'
                    content='This action can not be undo.'
                    confirmButton="Delete"
                    onCancel={() => setOpen(false)}
                    onConfirm={handleDeleteExpense}
                />
            </div>
            <div className="amt-cat">
                <div><b>Amount</b>: {`${expense.amount} ${expense.currency}`}</div>
                <p><b>Category</b>: {`${expense.category}`}</p>
            </div>
            <p>{expense.description}</p>
        </div>
    );
}

export default ExpenseCard;