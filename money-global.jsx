import React ,{useEffect,useState}from "react";
import { Popover, Button, TextInput } from "@mantine/core";
import { RiArrowDropDownLine } from "react-icons/ri";
import styles from './pages.module.css'
import { TbCoinYuanFilled } from "react-icons/tb";
import axios from "axios";
import Image from "next/image";
import { Switch } from '@mantine/core';
import { FaCediSign } from "react-icons/fa6";
import { TbTransfer } from "react-icons/tb";



function MoneyDisplay() {



    
  const [addressData, setAddressData] = useState([]);
  const [currentMoney,setCurrentMoney] = useState({
    name:'Yuan',
    value:323.00,
    icon:'https://cdn.icon-icons.com/icons2/2069/PNG/512/yuan_coin_finance_icon_125513.png'
  })

  // Fetch data from endpoint
    const fetchAddressData = async () => {
      try {
        const response = await axios.get('http://192.168.1.38/task/apis/currency.php');
        const data = response.data.money.crypto.map(item => ({
          id: item.cryptovalue,
          address: item.cryptoaddress,
          name:item.name,
          value:0.00,
          icon:`https://nowpayments.io/images/coins/${item.cryptovalue.toLowerCase()}.svg`
        }));
        console.log('promisfy',data)
        setAddressData(data);
      } catch (error) {
        console.error("promisfy", error);
      }
    };
  useEffect(() => {
    fetchAddressData();
  }, []);


  const Fiat = [
      {
        name:'Yuan',
        icon:'https://cdn.icon-icons.com/icons2/2069/PNG/512/yuan_coin_finance_icon_125513.png',
        value:323.00
      },
      {
        name:'Cedi',
        icon:'https://cdn-icons-png.flaticon.com/128/4894/4894505.png',
        value:100.00
      },
  ]

  return (
    <Popover width={300} trapFocus position="bottom" withArrow shadow="md">
      <Popover.Target>
        <div className={styles.flowmoney}>
          <div className={styles.moneyicon_fiat}>
            <Image className={styles.immi} src={currentMoney.icon} height={400} width={400}  />
          </div>
          <div className={styles.moneybox}>
            {currentMoney.value}
          </div>
          <RiArrowDropDownLine color="white" style={{marginTop:-7}} size={30} />
        </div>
      </Popover.Target>
      <Popover.Dropdown className={styles.drop} style={{padding:0,border:'none'}}>
        <div className={styles.container}>
          <div className={styles.curencybox}>
             <div className={styles.title}>Fiat</div>
             {Fiat.map((item,i)=>(
                <div onClick={()=>setCurrentMoney(item)} className={`${styles.moneydis} ${currentMoney.name === item.name?styles.active:''}`}>
                    <div  className={styles.sert}>
                      <div className={styles.moneyicon_crp}>
                        <Image className={styles.immi} src={item.icon} height={400} width={400}  />
                      </div>
                        <div className={styles.moneyicon_}>{item.name}</div>
                    </div>
                    <div className={styles.moneyicon}>
                        <div className={styles.moneey}>{item.value}</div>
                        <TbTransfer />
                        <div className={styles.moneey_small}>0.00</div>
                    </div>
                </div>
             ))}
             
             <div className={styles.title}>Crypto</div>
             {addressData && addressData.map((item,i)=>(
                <div onClick={()=>setCurrentMoney(item)} key={i} className={`${styles.moneydis} ${currentMoney.name === item.name?styles.active:''}`}>
                  <div className={styles.sert}>
                      <div className={styles.moneyicon_crp}>
                        <Image className={styles.immi} src={item.icon} height={400} width={400}  />
                      </div>
                      <div className={styles.moneyicon_}>{item.name}</div>
                  </div>
                  <div className={styles.moneyicon}>
                      <div className={styles.moneey}>{item.value}</div>
                      <div className={styles.moneey_small}>0.00</div>
                  </div>
               </div>
             ))}

          </div>
        </div>
        <div className={styles.bottonoprions}>
        <Switch
        defaultChecked
        color="violet"
        label="View in Fiat"
        classNames={{
            label: 'custom-label',
            input: 'custom-input',
            track: 'custom-track',
          }}
        size="xs"
        />

        <Switch
         color={"violet"}
         label="Hide Small"
         classNames={{
            label: 'custom-label',
            input: 'custom-input',
            track: 'custom-track',
          }}
          size="xs"
        />
        </div>
      </Popover.Dropdown>
    </Popover>
  );
}

export default MoneyDisplay;
