# Expense-Manager
# Key Features of this Application

- Keep Record of How Much you spend.
- Add Your Expenses According to Category.
- You Can See All of Your Expenses At One Place.
- You Can Filter Your Expenses According to Category.
- You Can Update or Delete Your Previous Added Expenses.
- You Can See Your Weekly Expense Report of Current Month.
- You Can See Your Category Wise Expense Report of Current Month.

---

# **Requirements**

The task must satisfy the following requirements:

- [x] 1. User authentication: SignIn and Signup
- [x] 2. Provide three tabs - Dashboard, Expenses, and reports accessible through a navbar.
- [x] 3. Dashboard:
    1. Show total spent amount
    2. List last 5 transactions
- [x] 4. Expenses:
    1. List of expenses for the current user.
    2. Button to create a new expense.
    3. Must contain the following fields: DateTime, Amount, Currency, Description (optional), and a Category.
    4. The categories are -- Home, Food, Fuel, Shopping and Other.
    5. Can be created only after logging in
    6. Can be read only by the user who owns it.
    7. Can be updated or deleted by the user who owns it.
    8. Ability to filter the expenses by category.
- [x] 5. Report:
    1. Show total amount spent per week of the current month.
    2. Show total amount spent per category basis on the current month.
- [x] 6. The front-end must be a Single-Page-Application.
- [x] 7. Follow proper design guidelines and coding standards.

---

# **Improvements**

These are optional improvements that’ll help in boosting your submission score.

- [x] 1. No business logic code in client app. (It must be only on the backend-server)
- [x] 2. The front-end web client is a PWA (Progressive Web App).
- [x] 3. Hosting the front-end and back-end to a cloud or hosting provider.
    1. Better if the cloud provider is Google Cloud Platform.
- [ ] 4. Using GraphQL instead of traditional REST API.
- [ ] 5. Pagination on the list of expenses.
- [ ] 6. Use ReactiveExtensions in client web app: (RxJs for Javascript)
- [x] 7. User roles -- Admin and normal users.
    1. A separate page for Admin listing all users (only accessible by admin users)
    2. Admin users can view the expenses of all the users.
    3. Admin users can edit or delete the expense of all users.

---

# Screenshots of Web Application
**Landing Page Of Web Application**
![image](https://user-images.githubusercontent.com/56120769/127119481-b3de7cc4-cfd9-4b22-8bed-24b8d3b46d8e.png)

**Normal User Login Page**
![image](https://user-images.githubusercontent.com/56120769/127119504-6086b078-0d51-4d4a-9e32-ebb416b15e4c.png)

**User Register Page**
![image](https://user-images.githubusercontent.com/56120769/127119574-1e8694df-26f4-4de7-b5ce-ca4246e75b10.png)

**Admin Login Page**
![image](https://user-images.githubusercontent.com/56120769/127119606-55e61519-5759-44b7-8288-c72031416785.png)

**Normal User Dashboard**

where person can see his total expense(in INR) and five latest expenses made by him.
![image](https://user-images.githubusercontent.com/56120769/127119038-d9709ee9-c95a-44c0-b0fa-09c5b23381fc.png)

**Expense Page**

where person can see all of the expense added by him(sorted in descending order of date and time), a button to add new expenses, filter expenses category wise and button to delete or edit particular expense.
![image](https://user-images.githubusercontent.com/56120769/127118663-a5295136-5a3a-49db-b5bf-6a43c19cb834.png)

**Add Expense Page**

here user can add new expenses and choose any currency(used an api to get all currency name) while adding an expense.
![image](https://user-images.githubusercontent.com/56120769/127119224-3f30072d-87cb-4cab-949e-bfd946995010.png)

**Delete Particular Expense**
![image](https://user-images.githubusercontent.com/56120769/127119117-99b31254-eae7-4a53-a934-9e13db20ef23.png)

**Edit Particular Expense**
![image](https://user-images.githubusercontent.com/56120769/127119175-e8dbe166-7599-4cf9-839a-3d6a9c9238ef.png)

**Report Page**

weekly report of expense of current month added by user(in INR)(used an api to change any currency to Indian currency)
![image](https://user-images.githubusercontent.com/56120769/127118431-53009860-3701-4033-bb7e-0803ebaef364.png)

category wise report of expense of current month added by user(in INR)(used an api to change any currency to Indian currency)
![image](https://user-images.githubusercontent.com/56120769/127118567-e45c310f-cc66-4608-a059-5b3c4033bfe7.png)

**Admin Page**

list of all user (only visible to admin)
![image](https://user-images.githubusercontent.com/56120769/127119324-f7d43586-1e0c-4ff2-96db-bfb256ad70e2.png)

expense added by particular user(admin can edit or delete expense)
![image](https://user-images.githubusercontent.com/56120769/127119374-b5e543c8-ac4a-42a3-9b84-3b46f77a1c89.png)


---

# Adming Credentials
**Email :** admin@gmail.com

**Password :** 654321

---

# External Api
In this website I used two external api. one to access all available currency name(to show on add and edit expense page) and another to convert any currency into Indian currency(while showing total expense on dashboard or on report page.)
