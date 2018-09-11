module.exports = {
	formatTimeStamp(timeStamp) {
		var dateTime = new Date('01/01/1970')
		dateTime.setMilliseconds(dateTime.getMilliseconds() + timeStamp)
		dateTime.setMinutes(dateTime.getMinutes() - dateTime.getTimezoneOffset()) // to local time

		const date = '0' + dateTime.getDate()
		const month = '0' + (dateTime.getMonth() + 1)
		const year = dateTime.getFullYear()
		var hours = dateTime.getHours()
		var minutes = '0' + dateTime.getMinutes()

		// Will display time in dd/mm/yy 10:30 format
		var formattedTime =
			date.substr(-2) +
			'/' +
			month.substr(-2) +
			'/' +
			year.toString().substr(-2) +
			' ' +
			hours +
			':' +
			minutes.substr(-2)
		return formattedTime
	}
}
