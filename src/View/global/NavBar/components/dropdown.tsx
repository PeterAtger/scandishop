import React, { Component } from 'react'
import { AiOutlineDown } from 'react-icons/ai'
import { connect } from 'react-redux'
import { CurrenciesProps } from '../../../../Data/Models/DataModels'
import { selectCurrency } from '../../../../Logic/Store/rootReducer'
import './dropdown_styles.scss'


type Props = {
    placeHolder: string,
    options: CurrenciesProps[],
    selectCurrency: (currency: CurrenciesProps) => any
}

type State = {
    dropDownClicked: boolean
}

class AppCurrencyDropdown extends Component<Props, State> {

    state: Readonly<State> = {
        dropDownClicked: false
    }

    clickHandler = () => { this.setState({ dropDownClicked: !this.state.dropDownClicked }) }

    render() {
        const dropdownMenu = () => {
            let Menu: any[] = []
            for (let i = 0; i < this.props.options.length; i++) {
                Menu.push(
                    <div key={this.props.options[i].code} className='option' onClick={() => { this.props.selectCurrency(this.props.options[i]) }}>
                        {`${this.props.options[i].symbol} ${this.props.options[i].code}`}
                    </div>
                )
            }
            return Menu
        }
        return (
            <div onClick={this.clickHandler} className="dropdown-container">
                <div className="currency-dropdown-selector">
                    {this.props.placeHolder}
                    <AiOutlineDown />
                </div>
                {this.state.dropDownClicked &&
                    <div className="dropdown-menu">
                        {dropdownMenu()}
                    </div>
                }
            </div>
        )
    }
}

const MapDispatchToProps = (dispatch: any) => {
    return {
        selectCurrency: (currency: CurrenciesProps) => dispatch(selectCurrency(currency))
    }
}

export default connect(null, MapDispatchToProps)(AppCurrencyDropdown)