import React from 'react';
import { InputGroup } from 'react-bootstrap';
import SidebarTabs from './SidebarTabs';
import '../css/SidebarHeader.css';

const SidebarHeader = ({ onSearch, onNewChat, activeTab, onTabSelect }) => {
  return (
      <div className="sidebar-header"
           style={{
               height: '150px'
           }}>
          <h5 className="sidebar-title">Чаты</h5>
          <button className="new-chat-button" onClick={onNewChat}>
              <img src={require('../assets/New_chat.png')} alt="Новый чат"/>
          </button>
          <InputGroup className="mb-3" style={{position: 'relative', top: '15px'}}>
              <input
                  type="text"
                  style={{
                      width: '375px',
                      padding: '10px',
                      border: '1px solid #ccc',
                      borderRadius: '5px',
                      outline: 'none',
                      fontSize: '16px',
                      marginTop: '30px',
                  }}
                  placeholder="Поиск..."
                  onChange={(e) => onSearch(e)}
              />
          </InputGroup>
          <SidebarTabs activeTab={activeTab} onTabSelect={onTabSelect}/>
      </div>
  );
};

export default SidebarHeader;