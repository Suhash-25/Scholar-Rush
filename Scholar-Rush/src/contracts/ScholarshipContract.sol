
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title ScholarshipContract
 * @dev Contract for recording scholarship application decisions on Base Sepolia
 */
contract ScholarshipContract {
    address public owner;
    
    // Application struct to store decision data
    struct Application {
        bool approved;
        uint256 timestamp;
    }
    
    // Mapping to track applications by applicant address
    mapping(address => Application) public applications;
    
    // Event emitted when an application decision is recorded
    event ApplicationLogged(address applicant, bool approved, uint256 timestamp);
    
    // Modifier to restrict certain functions to the contract owner
    modifier onlyOwner() {
        require(msg.sender == owner, "Not authorized");
        _;
    }
    
    /**
     * @dev Constructor sets the contract owner
     */
    constructor() {
        owner = msg.sender;
    }
    
    /**
     * @dev Record an application decision
     * @param applicant The address of the scholarship applicant
     * @param approved Whether the application was approved
     */
    function recordDecision(address applicant, bool approved) external onlyOwner {
        uint256 timestamp = block.timestamp;
        
        // Store the application decision
        applications[applicant] = Application({
            approved: approved,
            timestamp: timestamp
        });
        
        // Emit the event
        emit ApplicationLogged(applicant, approved, timestamp);
    }
    
    /**
     * @dev Check if an applicant has an approved application
     * @param applicant The address to check
     * @return Whether the applicant has an approved application
     */
    function isApproved(address applicant) external view returns (bool) {
        return applications[applicant].approved;
    }
    
    /**
     * @dev Get application details for an applicant
     * @param applicant The address to check
     * @return approved Whether the application was approved
     * @return timestamp When the application was recorded
     */
    function getApplication(address applicant) external view returns (bool approved, uint256 timestamp) {
        Application memory app = applications[applicant];
        return (app.approved, app.timestamp);
    }
    
    /**
     * @dev Allow the owner to transfer ownership
     * @param newOwner The address of the new owner
     */
    function transferOwnership(address newOwner) external onlyOwner {
        require(newOwner != address(0), "Invalid address");
        owner = newOwner;
    }
}
