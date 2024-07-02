const FantanWrapper = () => {
  const { data: session } = useSession() as {data:any}
  const [loading, setIsLoading] = useState(false)
  const [games, setGames] = useState([])


  const [selectedButton, setSelectedButton] = useState(null)
  const {
    changeMenu,
    setChangeMenu,
    MoneySelect,
    setMultiplier,
    CoinImages,
    totalMoney,
    multiplier,
    setValue,
    money,
    selectedValue,
    fantan,
    setMoney,
    addMoneyFantan,
    getImageForNumber,
    StackOfImages,
    fantan_betItem,
    ballPosition, setBallPosition
  }: any = useFantanGameContext()
  const router = useRouter()
  const lti = router.query.lti ? router.query.lti.toString() : null
  const [buttons, setButtons] = useState([])


const getFantanGames = async () => {
setIsLoading(true)

    const {data} = await axios.get(fantan_games)
    console.log("ftannn",data)
    setGames(data)
     if(data) setIsLoading(false)
}
  

useEffect(()=> {
    getFantanGames()
},[])

  const Menu = {
    1: {
      "Main": 
       <FiveDMain
        multiplier={multiplier}
        selectedValue={selectedValue}
        setMoney={setMoney}
        addMoneyFantan={addMoneyFantan}
        getImageForNumber={getImageForNumber}
        StackOfImages={StackOfImages}
        money={money}
        setValue={setValue}
        games={games}
        setBallPosition={setBallPosition}
        />,
      "FanTan 1": 
      <FiveDFanTan1
       multiplier={multiplier}
       selectedValue={selectedValue}
       setMoney={setMoney}
       addMoneyFantan={addMoneyFantan}
       getImageForNumber={getImageForNumber}
       StackOfImages={StackOfImages}
       money={money}
       setValue={setValue}
       games={games}
       setBallPosition={setBallPosition}
       />,
      "FanTan 2": 
      <FiveDFanTan2
       multiplier={multiplier}
       selectedValue={selectedValue}
       setMoney={setMoney}
       addMoneyFantan={addMoneyFantan}
       getImageForNumber={getImageForNumber}
       StackOfImages={StackOfImages}
       money={money}
       setValue={setValue}
       games={games}
       setBallPosition={setBallPosition}
       />,
      "Sum of": 
      <FiveDSumOf
        multiplier={multiplier}
        selectedValue={selectedValue}
        setMoney={setMoney}
        addMoneyFantan={addMoneyFantan}
        getImageForNumber={getImageForNumber}
        StackOfImages={StackOfImages}
        money={money}
        setValue={setValue}
        games={games}
        setBallPosition={setBallPosition}
      />,
      "And": 
      <FiveDAnd
        multiplier={multiplier}
        selectedValue={selectedValue}
        setMoney={setMoney}
        addMoneyFantan={addMoneyFantan}
        getImageForNumber={getImageForNumber}
        StackOfImages={StackOfImages}
        money={money}
        setValue={setValue}
        games={games}
        setBallPosition={setBallPosition}
       />,
      "Positioning":
      <FiveDPositioning 
        multiplier={multiplier}
        selectedValue={selectedValue}
        setMoney={setMoney}
        addMoneyFantan={addMoneyFantan}
        getImageForNumber={getImageForNumber}
        StackOfImages={StackOfImages}
        money={money}
        setValue={setValue}
        games={games}
        setBallPosition={setBallPosition}
      />,
    },
    2: {
      "Main": 
      <PK10Main
        multiplier={multiplier}
        selectedValue={selectedValue}
        setMoney={setMoney}
        addMoneyFantan={addMoneyFantan}
        getImageForNumber={getImageForNumber}
        StackOfImages={StackOfImages}
        money={money}
        setValue={setValue}
        games={games}
        setBallPosition={setBallPosition}
      />,
      "FanTan 1": 
      <PK10FanTan1
      multiplier={multiplier}
      selectedValue={selectedValue}
      setMoney={setMoney}
      addMoneyFantan={addMoneyFantan}
      getImageForNumber={getImageForNumber}
      StackOfImages={StackOfImages}
      money={money}
      setValue={setValue}
      games={games}
      setBallPosition={setBallPosition}
       />,
      "FanTan 2": 
      <PK10FanTan2 
        multiplier={multiplier}
        selectedValue={selectedValue}
        setMoney={setMoney}
        addMoneyFantan={addMoneyFantan}
        getImageForNumber={getImageForNumber}
        StackOfImages={StackOfImages}
        money={money}
        setValue={setValue}
        games={games}
        setBallPosition={setBallPosition}
      />,
      "Positioning": 
       <PK10Positioning
       multiplier={multiplier}
       selectedValue={selectedValue}
       setMoney={setMoney}
       addMoneyFantan={addMoneyFantan}
       getImageForNumber={getImageForNumber}
       StackOfImages={StackOfImages}
       money={money}
       setValue={setValue}
       games={games}
       setBallPosition={setBallPosition}
       />,
    },
    3: {
      "Main": 
       <Fast3Main
       multiplier={multiplier}
       selectedValue={selectedValue}
       setMoney={setMoney}
       addMoneyFantan={addMoneyFantan}
       getImageForNumber={getImageForNumber}
       StackOfImages={StackOfImages}
       money={money}
       setValue={setValue}
       games={games}
       setBallPosition={setBallPosition}
       />,
      "Miscellaneous": 
      <Miscellaneous
       multiplier={multiplier}
       selectedValue={selectedValue}
       setMoney={setMoney}
       addMoneyFantan={addMoneyFantan}
       getImageForNumber={getImageForNumber}
       StackOfImages={StackOfImages}
       money={money}
       setValue={setValue}
       games={games}
       setBallPosition={setBallPosition}
      />,
      "Short Deck Craps": 
      <ShortDeckCrap
      multiplier={multiplier}
      selectedValue={selectedValue}
      setMoney={setMoney}
      addMoneyFantan={addMoneyFantan}
      getImageForNumber={getImageForNumber}
      StackOfImages={StackOfImages}
      money={money}
      setValue={setValue}
      games={games}
      setBallPosition={setBallPosition} 
      />,
    },
    8: {
      "Main": 
      <Mark6Main
       multiplier={multiplier}
       selectedValue={selectedValue}
       setMoney={setMoney}
       addMoneyFantan={addMoneyFantan}
       getImageForNumber={getImageForNumber}
       StackOfImages={StackOfImages}
       money={money}
       setValue={setValue}
       games={games}
       setBallPosition={setBallPosition} 
      />,
      "Special Code": 
      <SpecialCode
      multiplier={multiplier}
      selectedValue={selectedValue}
      setMoney={setMoney}
      addMoneyFantan={addMoneyFantan}
      getImageForNumber={getImageForNumber}
      StackOfImages={StackOfImages}
      money={money}
      setValue={setValue}
      games={games}
      setBallPosition={setBallPosition} 
      />,
    },
    10: {
      Main: 
       <Happy8Main
       multiplier={multiplier}
       selectedValue={selectedValue}
       setMoney={setMoney}
       addMoneyFantan={addMoneyFantan}
       getImageForNumber={getImageForNumber}
       StackOfImages={StackOfImages}
       money={money}
       setValue={setValue}
       games={games}
       setBallPosition={setBallPosition}
       />,
      "FanTan 1": 
      <Happy8FanTan1
      multiplier={multiplier}
      selectedValue={selectedValue}
      setMoney={setMoney}
      addMoneyFantan={addMoneyFantan}
      getImageForNumber={getImageForNumber}
      StackOfImages={StackOfImages}
      money={money}
      setValue={setValue}
      games={games}
      setBallPosition={setBallPosition} 
       />,
      "FanTan 2": 
      <Happy8FanTan2
      multiplier={multiplier}
      selectedValue={selectedValue}
      setMoney={setMoney}
      addMoneyFantan={addMoneyFantan}
      getImageForNumber={getImageForNumber}
      StackOfImages={StackOfImages}
      money={money}
      setValue={setValue}
      games={games}
      setBallPosition={setBallPosition} 
      />,
    },
  }

  useEffect(() => {
    if (lti && fantan[lti]?.games) {
      const gameNames = Object.keys(fantan[lti].games)

      if (gameNames?.length > 0) {
        setButtons(
          gameNames.map((gameName, index) => ({
            id: index + 1,
            label: gameName,
          }))
        )
        setSelectedButton(gameNames[0])
        setChangeMenu(gameNames[0]);
      } else {
        setButtons([])
        setSelectedButton(null)
      }
    }
  }, [lti, fantan])

  if (loading) return <Loader />

  return (
    <>
      <div className={styles.gameboard}>
        <div className={styles.fantan_main}>
          <FanTanBoardInfo />
          <div className={styles.tabs}>
            <div className={styles.fantan}>
              {buttons.map((item) => (
                <button
                  key={item.id}
                  className={styles.buttons}
                  style={{
                    background:
                      selectedButton === item.label
                        ? "linear-gradient(to right, #f3782b, orange)"
                        : "",
                    color: selectedButton === item.label ? "white" : "",
                  }}
                  onClick={() => {
                    setChangeMenu(item.label)
                    setSelectedButton(item.label)
                  }}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
          <div className={styles.game}>
            <div className={styles.board}>
              <FantanLayoutProvider>
              {Menu[lti]?.[changeMenu] || Menu[lti]?.[selectedButton] || <Error />}
              </FantanLayoutProvider>
            </div>
          </div>
          <div className={styles.roadbet}>Road bet container</div>
        </div>
      </div>
      <footer className={styles.footer}>
        <FantanControlBoard
          MoneySelect={MoneySelect}
          setMultiplier={setMultiplier}
          loading={false}
          multiplier={multiplier}
          money={money}
          session={session}
          setInputValues={setValue}
          selectedValues={selectedValue}
          setMoney={setMoney}
          setValue={setValue}
          betItems={fantan_betItem}
        />
      </footer>
    </>
  )
}
