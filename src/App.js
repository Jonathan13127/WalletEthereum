import { useState, useEffect } from 'react';  
import { ethers } from 'ethers';
import Wallet from './artifacts/contracts/Wallet.sol/Wallet.json';
import './App.css';
import github from './img/icons8-github-90.png';
import linkedin from './img/linkedin.png'

let WalletAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

function App() {

  const [balance, setBalance] = useState(0);
  const [amountSend, setAmountSend] = useState();
  const [amountWithdraw, setAmountWithdraw] = useState();
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    getBalance();
  },[])

  async function getBalance() {
    if(typeof window.ethereum !== 'undefined'){
      const accounts = await window.ethereum.request({method:'eth_requestAccounts'});
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(WalletAddress, Wallet.abi, provider);
      try{
        let overrides = {
          from: accounts[0]
        }
        const data = await contract.getBalance(overrides)
        setBalance(String(data));
      }catch(err){
        console.log(err);
        setError("Une erreur est survenue.")
      }
    }
  }

  async function transfer() {
    if(!amountSend){
      return;
    }
    setError('');
    setSuccess('');
    if(typeof window.ethereum !== 'undefined'){
      const accounts = await window.ethereum.request({method:'eth_requestAccounts'});
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      try{
        const tx = {
          from: accounts[0],
          to: WalletAddress,
          value: ethers.utils.parseEther(amountSend)
        }
        if(tx.value != 0){
          const transaction = await signer.sendTransaction(tx);
          await transaction.wait();
          setAmountSend('');
          getBalance();
          setSuccess('Votre argent a bien été transféré sur le portefeuille');
        }else{
          setError("Impossible d'envoyer 0 ETH")
          return
        }
      }
      catch(err){
        setError('Une erreur est survenue.');
      }
    }
  }

  async function withdraw(){
    if(!amountWithdraw){
      return;
    }
    setError('');
    setSuccess('');
    const accounts = await window.ethereum.request({method:'eth_requestAccounts'});
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(WalletAddress, Wallet.abi, signer);
    try{
      const Withdraw = ethers.utils.parseEther(amountWithdraw);
      if(Withdraw != 0){
        const transaction = await contract.withdrawMoney(accounts[0], Withdraw);
        await transaction.wait();
        setError('');
        getBalance();
        setSuccess('Votre argent a bien été retiré sur le portefeuille');
      }else{
        setError("Impossible de retirer 0 ETH")
        return
      }
    }catch(err){
      setError('Une erreur est survenue.');
    }
  }

  function changeAmountSend(e){
    if(e.target.value == 0){
      setSuccess('');
      setError("ATTENTION vous allé envoyer 0 ETH");
    }
    setAmountSend(e.target.value);
  }

  function changeAmountWithdraw(e){
    if(e.target.value == 0){
      setSuccess('');
      setError("ATTENTION vous allé retiré 0 ETH");
    }
    setAmountWithdraw(e.target.value);
  }

  function pause(ms) 
  {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async function afficherDate() 
  {
    while(true) 
    {
      await pause(1000);
      var cejour = new Date();
      var options = {weekday: "long", year: "numeric", month: "long", day: "2-digit"};
      var date = cejour.toLocaleDateString("fr-FR", options);
      var heure = ("0" + cejour.getHours()).slice(-2) + ":" + ("0" + cejour.getMinutes()).slice(-2) + ":" + ("0" + cejour.getSeconds()).slice(-2);
      var dateheure = date + " " + heure;
      var dateheure = dateheure.replace(/(^\w{1})|(\s+\w{1})/g, lettre => lettre.toUpperCase());
      document.getElementById('dateheure').innerHTML = dateheure;
  }
  }
afficherDate();

  return (
    <div className="App">
      <header>
        <div id="dateheure"></div>
      </header>
      <div className='container'>
        <div className='logo'>
          <i className="fa-brands fa-ethereum"></i>
        </div>
        <h2>{balance /10**18} <span className='eth'>eth</span></h2>
        <div className='wallet_flex'>
          <div className='walletG'>
              <h3>Envoyer de l'ether</h3>
              <input type="text" placeholder="Montant en Ethers" onChange={changeAmountSend}/>
              <button onClick={transfer}>Envoyer</button>
            </div>
          <div className='walletD'>
              <h3>Retirer de l'ether</h3>
              <input type="text" placeholder="Montant en Ethers" onChange={changeAmountWithdraw}/>
              <button onClick={withdraw}>Retirer</button>
          </div>
        </div>
        {error && <p className='error'>{error}</p>}
        {success && <p className='success'>{success}</p>}
        <footer id="footer">
          <a href='https://github.com/Jonathan13127' target="_blank">
            <img id="footer_img" src={github} alt="Mon GitHub"/>
          </a>
          <a href='https://www.linkedin.com/in/jonathan-mallia-44b75b1b8/' target="_blank">
            <img id="footer_img" src={linkedin} alt="Mon Linkedin"/>
          </a>
        </footer>
      </div>
    </div>
  );
}

export default App;
