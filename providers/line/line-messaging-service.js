'use strict'

import 'isomorphic-fetch'
const line = require('@line/bot-sdk')
// const request = require('request')
// import { getStreamData } from '../../utils/steam'
var fs = require('fs')

// let Promise = require('bluebird')
// Promise.promisifyAll(request)
//const linebot = require('linebot')

/**
@class
*/
export default class LineMessagingService {
	/**
    @constructor
    @param {Object} options
    @param {String} options.channel_access_token - LINE channel access token
    @param {String} [options.channel_secret] - LINE Channel secret
    */
	constructor(options) {
		const required_params = ['channel_access_token']
		const optional_params = ['channel_secret']

		// Check if required parameters are all set.
		required_params.map(param => {
			if (!options[param]) {
				throw new Error(`Required parameter ${param} is missing.`)
			}
		})

		// Check if configured parameters are all valid.
		Object.keys(options).map(param => {
			if (
				!required_params.includes(param) &&
				!optional_params.includes(param)
			) {
				throw new Error(`${param} is not a valid parameter.`)
			}
		})

		this.channel_access_token = options.channel_access_token
		this.channel_secret = options.channel_secret

		// create LINE SDK config from env variables
		const config = {
			channelAccessToken: this.channel_access_token,
			channelSecret: this.channel_secret
		}

		// create LINE SDK client
		this.lineClient = new line.Client(config)

		// this.bot = linebot({
		// 	channelId: 1599454831,
		// 	channelSecret: this.channel_secret,
		// 	channelAccessToken: this.channel_access_token
		// })
	}

	/**
    Method to get user's display name, profile image, and status message.
    @method
    @param {String} user_id - user_id
    @return {Object}
    */
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

	/**
    Method to get user's display name, profile image, and status message.
    @method
    @param {String} message_id - messaging_id
    @return {Object}
    */
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
