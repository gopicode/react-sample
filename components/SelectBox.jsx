import React from 'react'
import ReactDOM from 'react-dom'

function isAncestor(kid, root) {
	var p = kid.parentNode;
	while (p) {
		if (p === root) return true
		p = p.parentNode
	}
}

// TODO use css-modules
const styles = {
	base: 'ux-select',
	box: 'ux-select-box',
	txt: 'ux-select-txt',
	list: 'ux-select-list',
	item: 'ux-select-item',
	itemActive: 'ux-select-item--active'
}

export class SelectBox extends React.Component {
	constructor(props) {
		super(props);
		try {
			this.make()
		} catch (err) {
			console.error(err.stack || err)
			this.state = {
				makeError: err
			}
		}
	}
	make() {
		this.state = {
			isOpen: false,
			value: this.props.value,
			txtValue: (this.props.value ? this.props.value.label : ''),
			list: this.props.list,
			index: -1
		}
		this.buildOptions()
	}
	buildOptions() {
		this.state.options = this.props.list.map((item, k) => {
			return (<option key={k} value={item.value}>{item.label}</option>)
		})
	}
	buildItems() {
	}
	componentDidMount() {
		document.addEventListener('click', this.onDocumentClick, false)
	}
	componentWillUnmount() {
		document.removeEventListener('click', this.onDocumentClick, false)
	}
	onDocumentClick = (e) => {
		const kid = e.target;
		const root = ReactDOM.findDOMNode(this)
		if (isAncestor(kid, root)) return
		this.setState({isOpen: false})
	}
	onChange = (e) => {
		this.setState({txtValue: e.target.value})
	}
	onFocus = (e) => {
		e.target.select()
		// this.setState({isOpen: true})
	}
	onBlur = (e) => {
		const kid = e.relatedTarget
		const root = ReactDOM.findDOMNode(this)
		if (!kid) return
		if (isAncestor(kid, root)) return
		this.setState({isOpen: false})
	}
	onInput = (e) => {
		const query = e.target.value.toLowerCase()
		const list = this.props.list.filter(item => {
			return (!query || item.label.toLowerCase().indexOf(query) !== -1)
		})
		this.setState({list, index: -1, isOpen: true})
	}
	onKeyDown = (e) => {
		switch (e.key) {
			case "ArrowDown":
				this.setState({index: this.state.index + 1, isOpen: true})
				break;
			case "ArrowUp":
				this.setState({index: this.state.index - 1})
				break;
			case "ArrowLeft":
				break;
			case "ArrowRight":
				break;
			case "Enter":
				this.selectItem(this.state.index)
				break;
			case "Escape":
				break;
		}

	}
	onClickItem = (e) => {
		e.stopPropagation()
		const index = +e.target.getAttribute('data-index')
		this.selectItem(index)
	}
	selectItem(index) {
		const item = this.state.list[index]
		if (!item) return
		this.setState({value: item, txtValue: item.label,  isOpen: false})
		if (typeof this.props.onChange === 'function') {
			this.props.onChange(item)
		}
	}
	render2() {
		const css = [styles.base, this.props.className || ''].join (' ')
		const style = {}
		if (!this.state.isOpen) style.display = 'none'

		const items = this.state.list.map((item, k) => {
			const selected = (k === this.state.index ? styles.itemActive : '')
			const css = [styles.item, selected].join(' ')
			return (<li key={k} className={css} data-index={k} onClick={this.onClickItem}>{item.label}</li>)
		})

		return (
			<span className={css}>
				<select className={styles.box} ref={el => this.$select = el}>{this.state.options}</select>
				<input className={styles.txt} type="text" value={this.state.txtValue}
					onChange={this.onChange}
					onFocus={this.onFocus} onBlur={this.onBlur}
					onInput={this.onInput} onKeyDown={this.onKeyDown}
				/>
				<ol className={styles.list} style={style}>{items}</ol>
			</span>
		)
	}
	render() {
		if (this.state.makeError) {
			return (<span className="error">{this.state.makeError.toString()}</span>)
		}
		try {
			return this.render2()
		} catch(err) {
			console.error(err.stack || err)
			return (<span className="error">{err.toString()}</span>)
		}
	}
}
