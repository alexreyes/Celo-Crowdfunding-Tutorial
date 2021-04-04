# 1. Building a Crowdfunding Smart Contract in Celo

We're going to write a smart contract in Solidity which facilitates crowdfunding (like GoFundMe, Kickstarter, Indiegogo, etc) on Celo in 160 lines of code. 

The usual way of doing this might involve Plaid (banking), Stripe (payments), a database (for storing data), and AWS (for hosting):

![infrastructure](https://i.imgur.com/3PqEjaF.png)

Solidity and Celo make building the backend for this easy! Not to mention, global 🌎 from day one .

# Prerequisites

This tutorial assumes you have experience programming (ideally in Solidity). 

Before you continue, make sure you have truffle installed. If you don't, run the following line of code in your terminal: 

`npm install -g truffle`


# Project setup 

First, open the terminal and make a new project folder. We’ll call if celo-crowdfunding:

`mkdir celo-crowdfunding && cd celo-crowdfunding`

First, open the terminal and make a new project folder. We’ll call if celoSmartContract:

`mkdir celoSmartContract && cd celoSmartContract`

Next, let’s initialize the project directory with NPM

`npm init -y`

After it’s been initialized, we’ll need to install some additional packages for interacting with the smart contract in the next tutorial. Here’s an overview of them:
* ContractKit is a package created by the Celo team to aid in Celo development
* Dotenv is used for reading environment variables in our code
* Web3 is a library which facilitates our interactions with the blockchain
* OpenZeppelin Contracts are a library of battle-tested solidity code we can reuse

Install all of the above using:

`npm install -—save @celo/contractkit dotenv web3 @openzeppelin/contracts`

After all the NPM packages have installed, run this command to initialize Truffle: 

``truffle init``

Here's what a successful run of truffle init will look like: 

![truffle init](https://i.imgur.com/JF6zdoT.png)

# Writing the Contract

First things first, open our newly created project in your favorite code editor and create a file called **CeloCrowdfund.sol** in your ``contracts/`` folder.

At the top of the file, add the Solidity version and import the SafeMath contract from OpenZeppelin: 

```
pragma  solidity >=0.4.22 <0.9.0;

// Importing OpenZeppelin's SafeMath Implementation
import
"@openzeppelin/contracts/utils/math/SafeMath.sol";
```

SafeMath is a wrapper for the ``uint256`` type in Solidity. Integers in Solidity are vulnerable to overflow errors which can cause significant problems for our smart contracts. As a result, we'll use SafeMath. 

Next, we're going to initialize our contract: 
```
contract CeloCrowdfund {
  // SafeMath for safe integer operations
  using SafeMath for uint256;

  // List of all the projects
  Project[] private projects;
}
```
This is the start of the CeloCrowdfund contract. It includes a line to use SafeMath and an array of the ``Project`` type. ``Project`` is what we'll call our class to handle each project users create. 

Let's build that ``Project`` contract. In the same file, create a ``Project`` contract. 

For our ``Project`` contract, we'll need to keep track of a project's current state. A project can be in the fundraising, expired, or successful state. We use an ``enum`` to create a custom type for ``ProjectState``. 

```
contract  Project {
  using SafeMath for  uint256;
  
  enum  ProjectState {
    Fundraising,
    Expired,
    Successful
  }
}
```


## Expanding the Project contract
Next, we'll add some public variables about a ``Project``: 

```
  // Initialize public variables
  address  payable  public creator;
  uint  public goalAmount;
  uint  public completeAt;
  uint256  public currentBalance;
  uint  public raisingDeadline;
  string  public title;
  string  public description;
  string  public imageLink;

  // Initialize state at fundraising
  ProjectState public state = ProjectState.Fundraising;  
	
  mapping (address  =>  uint) public contributions;
```
Since these variables are all ``public``, they can be accessed by any other Solidity contract or dApp. 

After initializing the first set of variables, we set the ``state`` variable to start at a fundraising state when the Project is initialized. Next we create a [mapping](https://docs.soliditylang.org/en/v0.4.21/types.html#mappings) from user addresses to to the value they donate as a uint to keep track of the contributions made for the Project instance. A mapping is like a hash table or dictionary for Solidity. 

Now we want to add some [events](https://docs.soliditylang.org/en/v0.5.3/contracts.html#events) and a modifier: 
```
  // Event when funding is received
  event ReceivedFunding(address contributor, uint amount, uint currentTotal);

  // Event for when the project creator has received their funds
  event CreatorPaid(address recipient);

  modifier theState(ProjectState _state) {
    require(state == _state);
   _;
  }
```

When we call these events they will cause the arguments of the event to be stored in the transaction's logs on the blockchain. 

We also use a [modifier](https://docs.soliditylang.org/en/v0.5.3/contracts.html#function-modifiers) to check that the state of the project is always of type ``state``. Modifiers are a way to check a condition before executing a function in Solidity. We'll use the modifier in a couple of functions in our smart contract. 

Next, we'll add a constructor for the ``Project`` contract:
```
constructor
(
  address payable projectCreator,
  string memory projectTitle, 
  string memory projectDescription,
  string memory projectImageLink,
  uint fundRaisingDeadline,
  uint projectGoalAmount
) {
  creator = projectCreator;
  title = projectTitle; 
  description = projectDescription; 
  imageLink = projectImageLink; 
  goalAmount = projectGoalAmount;
  raisingDeadline = fundRaisingDeadline;
  currentBalance = 0;
}
```
If you've done some object oriented programming in the past, constructors should be familiar to you. They're essentially the parameters you need to create a ``Project`` object. 

### The Contribute() function

Next, let's create a function to contribute to a project: 
```
// Fund a project
function contribute() external theState(ProjectState.Fundraising) payable {
  require(msg.sender != creator);
  contributions[msg.sender] = contributions[msg.sender].add(msg.value);

  currentBalance = currentBalance.add(msg.value);

  emit ReceivedFunding(msg.sender, msg.value, currentBalance);

  checkIfFundingCompleteOrExpired();
}
```
The ``contribute()`` function is an external function. This means it can only be called from other smart contracts or transactions. 

The first thing the ``contribute()`` function does is check that the user calling the function with a transaction (msg.sender) is not the project creator: 

``require(msg.sender != creator);``

Next, it adds the user's address to the mapping of ``contributions`` with the user's address as the key and the funding amount as the value:  

``contributions[msg.sender] = contributions[msg.sender].add(msg.value);``

Then the function updates the project's current balance and emits a ``ReceivedFunding`` log: 

```
currentBalance = currentBalance.add(msg.value);

emit ReceivedFunding(msg.sender,  msg.value, currentBalance);
```

### The checkIfFundingCompleteOrExpired() function

Finally, the function calls ``checkIfFundingCompleteOrExpired();`` which doesn't exist yet. Let's create that now!

```
// check project state
function  checkIfFundingCompleteOrExpired() public {
  if (currentBalance >= goalAmount) {
    state = ProjectState.Successful;
    payOut();
  } 
  else  if (block.timestamp > raisingDeadline) {
    state = ProjectState.Expired;
  }
  
  completeAt = block.timestamp;
}
```
This function checks if the currentBalance for a project is greater than the goal amount. If it is, it changes the project state to successful and pays out the the project creator using the payOut() function. 

If the deadline is past the `block.timestamp` (the current time of the most recent block), then the project has expired and the state is updated. 

Next, let's make the payOut() function. 

### The payOut() function

Below the ``checkIfFundingCompleteOrExpired()`` function, add the following for ``payOut()``: 
```
function payOut() internal theState(ProjectState.Successful) returns (bool) {

  uint256 totalRaised = currentBalance;
  currentBalance =  0;
  
  if (creator.send(totalRaised)) {
    emit CreatorPaid(creator);
    return  true;
  } 
  else {
    currentBalance = totalRaised;
    state = ProjectState.Successful;
  }
   
  return  false;
}
```

The ``payOut()`` function will send the full amount raised by a project to the project creator. 

It first sets the total raised to be the currentBalance, and resets the current balance: 
```
uint256 totalRaised = currentBalance;
currentBalance = 0;
```

Next it sends the money to the contract creator with the ``.send()`` solidity function and emits a ``CreatorPaid`` log: 

```
if (creator.send(totalRaised)) {
  emit CreatorPaid(creator);
  return  true;
} 
 ```

### The getDetails() function

Finally, we're going to add the last function in our Project contract, the ``getDetails()`` function. 

```
function  getDetails() public  view  returns
(
  address  payable projectCreator,
  string  memory projectTitle,
  string  memory projectDescription,
  string  memory projectImageLink,
  uint fundRaisingDeadline,
  ProjectState currentState, 
  uint256 projectGoalAmount, 
  uint256 currentAmount
) {
  projectCreator = creator;
  projectTitle = title;
  projectDescription = description;
  projectImageLink = imageLink;
  fundRaisingDeadline = raisingDeadline;
  currentState = state;
  projectGoalAmount = goalAmount;
  currentAmount = currentBalance;
}
```
This function is pretty simple. It returns the information about the project by returning the public variables we set at the start of the ``Project`` contract. 

## Back to the CeloCrowdfund contract

![celo crowdfund contract back to the future](https://i.imgur.com/GAOnI9l.png)

Wow, that title is a mouthful. 

Anyways, it's time to get back to the ``CeloCrowdfund`` contract now that we've finished the ``Project`` contract. 

We'll start by adding an ``event`` for when a project is started: 

```
// event for when new project starts
event ProjectStarted(
  address contractAddress,
  address projectCreator,
  string title,
  string description,
  string imageLink,
  uint256 fundRaisingDeadline,
  uint256 goalAmount
);
```
We've used ``events`` in a couple of places in the contract so far. We're going to use this ``event`` to log when a project is created to the blockchain. 

Next, let's make the ``startProject`` function that we'll call from the ``CeloCrowdfund`` contract to start a project: 

```
function startProject(
  string calldata title, 
  string calldata description,
  string calldata imageLink,
  uint durationInDays,
  uint amountToRaise
) external {
  uint raiseUntil = block.timestamp.add(durationInDays.mul(1 days));
  
  Project newProject = new Project(payable(msg.sender), title, description, imageLink, raiseUntil, amountToRaise);
  projects.push(newProject);
  
  emit ProjectStarted(
    address(newProject),
    msg.sender,
    title,
    description,
    imageLink,
    raiseUntil,
    amountToRaise
  );
}
```
The ``startProject`` function takes in some basic info for creating a project like the title, description, imageLink, duration, and amount to raise. 

It then makes the ``raiseUntil`` variable by multiplying the ``durationInDays`` by ``1 days``. This will turn the ``durationInDays`` variable from a ``uint`` to something ``block.timestamp`` will accept. 

Next, our ``startProject`` function creates a ``newProject`` of type ``Project`` (from our ``Project`` contract) with the parameters the ``Project`` contract constructor takes.

Finally, the function emits a ``ProjectStarted`` log. 

One last thing for our ``CeloCrowdfund`` contract: we'll add a function to return the list of ``Projects`` created: 

```
function returnProjects() external view returns(Project[] memory) {
  return projects;
}
```

And that's it for our two contracts! 

# Conclusion 

Just like that, we've created a smart contract which will allow for crowdfunding in Celo. The full source code is available [here](https://github.com/alexreyes/Celo-Crowdfunding-Tutorial).

Hopefully creating this smart contract has given you a sense of what's possible. Without using any real external infrastructure aside from Solidity and the Celo network, we're able to accept payments and help users coordinate towards raising money for a project they want.  

In the next tutorial, we will discuss deploying the contracts to the Celo network!

**Note**: This tutorial and smart contract is based on the [contracts for Coperacha](https://github.com/Alex-Neo-Projects/Coperacha-contracts) an app built by the tutorial author.  If you want to see these contracts being used in a mobile app, you can see an example of that [here](https://github.com/Alex-Neo-Projects/Coperacha-app)
