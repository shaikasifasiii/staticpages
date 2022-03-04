import React, {Component} from 'react';
import InventoryLocations from './InventoryLocations';
import InventoryCompanies from './InventoryCompanies';
import InventoryStats from './InventoryStats';
class MainInventory extends Component {
    constructor(props) {
        super(props)

        this.state = {
            tab: 1
        }
    }
    changeTab = (tabValue) => {
        this.setState({
            tab: tabValue
        })
    }
    render() {
        const tabContent = this.state.tab === 1 ? <InventoryLocations /> : this.state.tab === 2 ? <InventoryCompanies /> : this.state.tab === 3 ? <InventoryStats /> : ''
        return (
            <div className="main-content">
                <h1 className="header">Inventory</h1>
                <div className="tab">
                    <div className="tab-labels">
                        <div className="label cursor-pointer" onClick={() => this.changeTab(1)}>
                            <span>LOCATIONS</span>
                            <span className={`inline-block active ${this.state.tab === 1 ? 'block' : 'hidden'}`}></span>
                        </div>
                        <div className="label cursor-pointer" onClick={() => this.changeTab(2)}>
                            <span>COMPANIES</span>
                            <span className={`inline-block active ${this.state.tab === 2 ? 'block' : 'hidden'}`}></span>
                        </div>
                        <div className="label cursor-pointer" onClick={() => this.changeTab(3)}>
                            <span>STATS</span>
                            <span className={`inline-block active ${this.state.tab === 3 ? 'block' : 'hidden'}`}></span>
                        </div>
                    </div>
                    <div className="tab-content">
                        {
                            tabContent
                        }
                    </div>
                </div>
            </div>
        )
    }
}

export default MainInventory