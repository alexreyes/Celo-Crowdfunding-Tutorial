pragma solidity >=0.4.22 <0.9.0;

// Importing OpenZeppelin's SafeMath Implementation
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

// IERC-20 contract 
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract CeloCrowdfund {
  // SafeMath for safe integer operations
  using SafeMath for uint256;

  // List of all the projects
  Project[] private projects;
	
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

  function startProject(
    IERC20 cUSDToken,
    string calldata title, 
    string calldata description,
    string calldata imageLink,
    uint durationInDays,
    uint amountToRaise
  ) external {
    uint raiseUntil = block.timestamp.add(durationInDays.mul(1 days));
    
    Project newProject = new Project(cUSDToken, payable(msg.sender), title, description, imageLink, raiseUntil, amountToRaise);
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

  function returnProjects() external view returns(Project[] memory) {
    return projects;
  }

}


contract Project {
  using SafeMath for uint256;
  
  enum ProjectState {
    Fundraising,
    Expired,
    Successful
  }
  IERC20 private cUSDToken;
  
  // Initialize public variables
  address payable public creator;
  uint public goalAmount;
  uint public completeAt;
  uint256 public currentBalance;
  uint public raisingDeadline;
  string public title;
  string public description;
  string public imageLink;

  // Initialize state at fundraising
  ProjectState public state = ProjectState.Fundraising;  
	
  mapping (address => uint) public contributions;

  // Event when funding is received
  event ReceivedFunding(address contributor, uint amount, uint currentTotal);

  // Event for when the project creator has received their funds
  event CreatorPaid(address recipient);

  modifier theState(ProjectState _state) {
    require(state == _state);
   _;
  }

  constructor
  (
    IERC20 token,
    address payable projectCreator,
    string memory projectTitle, 
    string memory projectDescription,
    string memory projectImageLink,
    uint fundRaisingDeadline,
    uint projectGoalAmount
  ) {
    cUSDToken = token;
    creator = projectCreator;
    title = projectTitle; 
    description = projectDescription; 
    imageLink = projectImageLink; 
    goalAmount = projectGoalAmount;
    raisingDeadline = fundRaisingDeadline;
    currentBalance = 0;
  }

  // Fund a project
  function contribute(uint256 amount) external theState(ProjectState.Fundraising) payable {
    cUSDToken.transferFrom(msg.sender, address(this), amount);
    
    contributions[msg.sender] = contributions[msg.sender].add(amount);
    currentBalance = currentBalance.add(amount);
    emit ReceivedFunding(msg.sender, amount, currentBalance);
    
    checkIfFundingExpired();
  }

  // check project state
  function checkIfFundingExpired() public {
    if (block.timestamp > raisingDeadline) {
      state = ProjectState.Expired;
    }
  }

  function payOut() external returns (bool result) {
    require(msg.sender == creator);
    
    uint256 totalRaised = currentBalance;
    currentBalance =  0;
    
    if (cUSDToken.transfer(msg.sender, totalRaised)) {
      emit CreatorPaid(creator);
      state = ProjectState.Successful;
      return  true;
    } 
    else {
      currentBalance = totalRaised;
      state = ProjectState.Successful;
    }
    
    return  false;
  }

  function getDetails() public  view  returns
  (
    address payable projectCreator,
    string memory projectTitle,
    string memory projectDescription,
    string memory projectImageLink,
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

}