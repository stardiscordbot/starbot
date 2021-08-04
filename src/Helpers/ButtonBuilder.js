module.exports = class Button {
  constructor () {
    this._emoji = null
    this._customID = null
    this._label = null
    this._style = 0
    this._disabled = false
    this._url = ''
  }

  /**
     * Set Button Emoji
     * @param {string} emoji
     * @returns {Button}
     */
  emoji (emoji) {
    this._emoji = emoji
    return this
  }

  /**
     * Set Button Style
     * @param {string | number} style
     * @returns {Button}
     */
  style (style) {
    this._style = style
    return this
  }

  /**
     * Set Button URL
     * @param {string} url
     * @returns {Button}
     */
  url (url) {
    this._url = url
    return this
  }

  /**
     * Set Button Label
     * @param {string | number} label
     * @returns {Button}
     */
  label (label) {
    this._label = label
    return this
  }

  /**
     * Set Button Status
     * @param {boolean} status
     * @returns {Button}
     */
  status (status) {
    this._disabled = status
    return this
  }

  /**
     * Set Button ID
     * @param {string | number} id
     * @return {Button}
     * ### Examples
     *| Name      | Value | Color                    | Required Field |
     *| --------- | ----- | ------------------------ | -------------- |
     *| Primary   | 1     | blurple                  | `custom_id`    |
     *| Secondary | 2     | grey                     | `custom_id`    |
     *| Success   | 3     | green                    | `custom_id`    |
     *| Danger    | 4     | red                      | `custom_id`    |
     *| Link      | 5     | grey, navigates to a URL | `url`          |
     */
  customID (id) {
    this._customID = id
    return this
  }

  get build () {
    return {
      type: 2,
      emoji: this._emoji,
      label: this._label,
      style: this._style,
      disabled: this._disabled,
      custom_id: this._customID,
      url: this._url
    }
  }
}
