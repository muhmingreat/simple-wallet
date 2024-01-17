import  React, {useState, useEffect} from 'react'
import {ethers } from 'ethers'
import { contractABI,contractAddress } from '../utils/constants'

export const TransactionContext = React.createContext() 

const {ethereum} = window

const getEthereumContract = () => {
    const provider = new ethers.providers.Web3Provider(ethereum)
        const signer = provider.getSigner()
        const transactionsContract = new ethers.Contract(contractAddress, contractABI, signer)
        
        return transactionsContract
    }

    export const TransactionProvider = ({children}) => {
        const [currentAccount, setCurrentAccount] = useState('')

        const [formData, setFormData] = useState({addressTo:'',amount:'', keyword:'', message:''})
        const [isLoading, setIsLoading] = useState(false)
        const [transactionCount, setTransactionCount] = useState(localStorage.getItem('transactionCount'))
        const [transactions, setTransactions] = useState([]);

        const handleChange= (e, addr) => {
            setFormData((prevState) => ({...prevState,[addr]: e.target.value}))
        }    
        
        const getAllTransactions = async () => {
            try{
                if (!ethereum) return alert("Please install metamask");
                    const transactionContract = getEthereumContract();
                    const availableTransactions = await transactionContract.getAllTransactions() 
                
                const structuredTransaction = 
                availableTransactions.map((transact) => ({
                 addressTo: transact.receiver,
                 addressFrom: transact.sender,
                   timestamp: new Date(transact.timestamp.toNumber() * 1000).toLocaleString(),
                   message: transact.message,
                   amount:parseInt(transact.amount._hex) / (10 ** 18)
                }))
                setTransactions(structuredTransaction)
                

                }catch(error) {
                    console.log(error)
            }
        }

        const checkIfWalletConnected = async () => {
            try {
                if(!ethereum) return alert('Please install metamask')
                const accounts = await ethereum.request({method:'eth_accounts'})
            if (accounts.length) {
                setCurrentAccount(accounts[0]);

               getAllTransactions();
            } else {
                console.log("No account found");
            }
        }catch(error) {
            console.log(error)
          throw new Error("No Ethereum object");  
    }
        }

        const checkIfTransactionExist = async () => {
            try{
                const transactionContract = getEthereumContract()
                const transactionCount = await transactionContract.getTransactionCount();
                    window.localStorage.setItem('transactionCount',transactionCount)

            }catch(error) {
                console.log(error);
                throw new Error("No Ethereum object");
            }
        }

        const connectWallet = async () => {
            try{
                if (!ethereum) return alert("Please install metamask");
                const accounts = await ethereum.request({ method: "eth_requestAccounts" });
               setCurrentAccount(accounts[0]);
            }catch(error){
                console.log(error)
                throw new Error('No Ethereum object')
            }

        }
        const sendTransaction = async () => {
            try{
                if (!ethereum) return alert("Please install metamask");
                const {addressTo, amount, keyword, message} = formData
            const transactionContract = getEthereumContract();
                const parsedAmount = ethers.utils.parseEther(amount)

                await ethereum.request({
                method:'eth_sendTransaction',
                params:[{
                from:currentAccount,
                to :addressTo,
                gas:'0x5208',// gas 21000 Gwei
                value:parsedAmount._hex, //0.0001
                }]
                })
            const transactionHash = await 
            transactionContract.addToBlockchain(
                addressTo,parsedAmount, message, keyword )   
            setIsLoading(true)
            console.log(`Loading ${transactionHash.hash}`)
                await transactionHash.wait()

                setIsLoading(false);
                console.log(`Success${transactionHash.hash}`);

                const transactionCount = await transactionContract.getTransactionCount()

                setTransactionCount(transactionCount.toNumber())
        }catch(error){
                console.log(error);
                throw new Error("No Ethereum object");   
            }
        }
        useEffect(() => {
            checkIfWalletConnected()
            checkIfTransactionExist()
        },[])
     return(

         <TransactionContext.Provider value={{connectWallet,currentAccount,formData,
          sendTransaction ,setFormData, handleChange, isLoading, transactions,}}>
            {children}
        </TransactionContext.Provider> 
     )  

    }



