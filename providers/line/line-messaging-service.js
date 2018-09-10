'use strict'

import 'isomorphic-fetch'
const line = require('@line/bot-sdk')

const channelAccessToken =
	process.env.LINE_MESSAGING_TOKEN ||
	'FVk42L1S6K2ttuQNUz9/B1Db+tfCKvh3zcGlXjAj5RcEkGP395jK3ztlLLeX/pte5V5q670cmwBhcK3yTFSMvsjIWG+816Q2lgAJQYHsKi7ezovlbmoTWS2Nliw5sCzTzbqsi1sxYf1t6t/3oUOvtAdB04t89/1O/w1cDnyilFU='
const channelSecret =
	process.env.LINE_MESSAGING_SECRET || '82ab29e5586ec2d769bca233487ca1f0'

export default class LineMessagingService {
	constructor() {
		const config = {
			channelAccessToken: channelAccessToken,
			channelSecret: channelSecret
		}
		this.lineClient = new line.Client(config)
	}

	get_user_profile(user_id) {
		return this.lineClient
			.getProfile(user_id)
			.then(response => {
				return response
			})
			.catch(err => {
				console.log(err)
			})
	}

	get_message_content(message_id) {
		return this.lineClient
			.getMessageContent(message_id)
			.then(stream => {
				return new Promise(function(resolve) {
					var chunks = []
					stream.on('data', chunk => {
						chunks.push(chunk)
					})
					stream.on('error', err => {
						throw err
					})
					stream.on('end', () => {
						var arraybuffer = Buffer.concat(chunks)
						var imgSrc =
							'data:image/jpeg;base64,' + arraybuffer.toString('base64')
						resolve(imgSrc)
					})
				})
			})
			.then(imgSrc => {
				return imgSrc
			})
			.catch(err => {
				console.log(err)
			})
	}
}
