//初期値
document.getElementById('MoneyInput').value = 0; 

//ボタンが押されたら…
let calcButton = document.getElementById('calcButton');
calcButton.onclick = function(){

	//警告用文字の表示領域を隠す
	document.getElementById('hiddenMassege').style.display="none";

	//金額の入力。入力値保持
	let MoneyInputSave = document.getElementById('MoneyInput').value;

	//金額の入力。数値化
	let MoneyInputSaveParse = parseFloat(MoneyInputSave);

	//購入品セレクトボックスの値を保持
	let ItemSelectSave = document.getElementById('ItemSelect').value;

	//支払い方法セレクトボックスの値を保持
	let PaymentSelectSave = document.getElementById('PaymentSelect').value;

	//数値以外が入力されたら
	if(isNaN(MoneyInputSaveParse) === true){

		//警告用文字の表示領域の要素取得
		let hiddenMassegeInner = document.getElementById('hiddenMassege');
		//表示領域が出現
		hiddenMassegeInner.style.display = 'block';
		//表示領域にメッセージ表示
		document.getElementById('hiddenMassege').innerText = '金額は半角数字のみで入力してください。';

		//初期化
		document.getElementById('MoneyInput').value = 0;
		
	}//購入品、支払い方法の入力チェック。未入力の場合。
	else if(ItemSelectSave === 'blanK' || PaymentSelectSave === 'blanKP'){

		//警告用文字の表示領域の要素取得
		let hiddenMassegeInner = document.getElementById('hiddenMassege');
		//表示領域が出現
		hiddenMassegeInner.style.display = 'block';
		//表示領域にメッセージ表示
		document.getElementById('hiddenMassege').innerText = '購入品と支払い方法を洗濯してください。';
		
	}else{

		//警告用文字の表示領域の要素取得
		let hiddenMassegeInner = document.getElementById('hiddenMassege');
		//表示領域は表示されない
		hiddenMassegeInner.style.display = 'none';
		
	}

	//消費税を算出関数呼び出し、便宜上呼び出し元①とする。
	let getTaxRateResult = getTaxRate(ItemSelectSave);
	document.getElementById('consumptionTax').innerText = getTaxRateResult + '％';

	//キャッシュバックの金額を算出関数呼び出し、便宜上呼び出し元②とする。
	let getCashBackResult = getCashBack(MoneyInputSaveParse,getTaxRateResult,PaymentSelectSave);
	document.getElementById('cashBack').innerText = getCashBackResult + '円分';

	//消費税込の金額の算出、便宜上呼び出し元③とする。
	let TaxCalcAnswerResult = TaxCalcAnswer(MoneyInputSaveParse,getTaxRateResult);
	document.getElementById('TaxIncludedAmount').innerText = TaxCalcAnswerResult + '円';	

}

////////////////////////////////////////////////////////////////////////////////////////

//消費税を算出する関数
function getTaxRate(ItemSelectSave){

	//もしセレクトボックスの値が飲食物なら
	if(ItemSelectSave === 'food'){

		//呼び出し元①に値8を返す
		return 8;

	//それ以外なら
	}else if(ItemSelectSave === 'anotheR'){

		//呼び出し元①に値10を返す
		return 10;

	}else {

		//初期の場合
		return 0;
	}
	
}

////////////////////////////////////////////////////////////////////////////////////////

//キャッシュバックの金額を算出する関数。
function getCashBack(MoneyInputSaveParse,getTaxRateResult,PaymentSelectSave){

	//もしも「消費税が10%かつ支払い方法がクレカのみ」なら？
	if(getTaxRateResult === 10 && PaymentSelectSave === 'credit'){
		
		//金額の値の小数点斬り捨て
		let getCashBackCalc = MoneyInputSaveParse;
		//金額×100分の5で金額の値の5パーセントを抽出		
		let getCashBackCalcResult = Math.floor(getCashBackCalc*(5/100));
		//呼び出し基②に値を返す
		return getCashBackCalcResult;

	//それ以外
	}else{

		//0を返す。
		return 0;

	}
	
}

////////////////////////////////////////////////////////////////////////////////////////

//消費税込の金額の算出
function TaxCalcAnswer(MoneyInputSaveParse,getTaxRateResult){

	//getTaxRateResultから渡された値が8(食品)なら
	if(getTaxRateResult === 8){

		//金額入力値×1.08
		let TaxCalcAnswerEightCase = MoneyInputSaveParse*1.08;

		//金額入力値×1.08を小数点切り上げ
		let TaxCalcAnswerEightCaseParse = Math.floor(TaxCalcAnswerEightCase);

		//呼び出し元③に値を返す
		return TaxCalcAnswerEightCaseParse;
		
	//それ以外なら
	}else{
		
		//金額入力値×1.1
		let TaxCalcAnswerTenCase = MoneyInputSaveParse*1.1;

		//金額入力値×1.1を小数点切り上げ
		let TaxCalcAnswerTenCaseParse = Math.floor(TaxCalcAnswerTenCase);

		//呼び出し元③に値を返す
		return TaxCalcAnswerTenCaseParse;

	}

}
////////////////////////////////////////////////////////////////////////////////////////