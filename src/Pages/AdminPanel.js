import React from 'react'
import { Switch, Route } from 'react-router-dom';
import Login from './Login';
import EditCategories from './EditCategories';
import ManageItems from './ManageItems';
import EditItemDetail from './EditItemDetail';
import UserData from './UserData';
import AddItem from './AddItems';
import ManageOrders from './ManageOrder';
import ContactMails from './ContactMail';

// import Login from './Login';
function AdminPanel() {
    return (
        <>
            <Switch>
                <Route exact path="/users" component={UserData} />
                <Route exact path="/" component={ManageItems} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/manage-item" component={ManageItems} />
                <Route exact path="/edit-categories" component={EditCategories} />
                <Route exact path="/add-item" component={AddItem} />
                <Route exact path="/manage-orders" component={ManageOrders} />
                <Route exact path="/contact-mails" component={ContactMails} />
                <Route exact path="/edit-item-detail" component={EditItemDetail} />

            </Switch>
        </>
    )
}

export default AdminPanel
