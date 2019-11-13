var selectDataList = [];

function selectExcel(obj) {
	var dataList = setData.dataList;
	if(obj.isActive == true) {
		obj.isActive = false;
		for(var i = 0; i < selectDataList.length; i++) {
			if(obj.id == selectDataList[i].id) {
				selectDataList.splice(i--, 1);
			}
		}
	} else {
		obj.isActive = true;
		selectDataList.push(obj);
	}
	for(var i = 0; i < dataList.length; i++) {
		if(dataList[i].isActive == true) {
			setData.allisActive = true;
		} else {
			setData.allisActive = false;
			break;
		}
	}
	if(window.setParentData) {
		setParentData();
	}
}

function allSelectExcel() {
	var dataList = setData.dataList;
	if(setData.allisActive == true) {
		setData.allisActive = false;
		for(var i = 0; i < dataList.length; i++) {
			dataList[i].isActive = false;
			for(var j = 0; j < selectDataList.length; j++) {
				if(dataList[i].id == selectDataList[j].id) {
					selectDataList.splice(j--, 1);
				}
			}
		}
	} else {
		setData.allisActive = true;
		for(var i = 0; i < dataList.length; i++) {
			if(dataList[i].isActive == false) {
				dataList[i].isActive = true;
				selectDataList.push(dataList[i]);
			}
		}
	}
	if(window.setParentData) {
		setParentData();
	}
}