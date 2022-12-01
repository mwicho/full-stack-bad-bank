function Withdraw(){
  const [show, setShow]     = React.useState(true);
  const [status, setStatus] = React.useState('');  

  return (
    <Card
      bgcolor="success"
      header="Withdraw"
      status={status}
      body={show ? 
        <WithdrawForm setShow={setShow} setStatus={setStatus}/> :
        <WithdrawMsg setShow={setShow}/>}
    />
  )
}

function WithdrawMsg(props){
  return(<>
    <h5>Success</h5>
    <button type="submit" 
      className="btn btn-light" 
      onClick={() => props.setShow(true)}>
        Withdraw again
    </button>
  </>);
}

function WithdrawForm(props){
  const [email, setEmail]   = React.useState('');
  const [amount, setAmount] = React.useState('');
   

  function handle(){

    var balanceUrl = `/account/balance/${email}`;
    var currentBal = 0;
    (async () => {
      var res = await fetch(balanceUrl);
      var balanceJson = await res.json();

      props.setShow(true);
      if (balanceJson) currentBal = balanceJson.balance;
    })()
    .then(() => {
      var newBalance = currentBal - amount;
      var withdrawUrl = `/account/depositOrWithdraw/${email}/${newBalance}`;
      (async () => {
        var res = await fetch(withdrawUrl);
        var updateCount = await res.json();

        console.log(updateCount);
      })();
      props.setShow(false);
    });
  }


  return(<>

    Email<br/>
    <input type="input" 
      className="form-control" 
      placeholder="Enter email" 
      value={email} 
      onChange={e => setEmail(e.currentTarget.value)}/><br/>

    Amount<br/>
    <input type="number" 
      className="form-control" 
      placeholder="Enter amount" 
      value={amount} 
      onChange={e => setAmount(e.currentTarget.value)}/><br/>

    <button type="submit" 
      className="btn btn-light" 
      onClick={handle}>
        Withdraw
    </button>

  </>);
}
