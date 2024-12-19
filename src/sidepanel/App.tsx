import React, { useEffect, useState } from 'react';
import { uid2Inspector } from '../inspectors/UID2Inspector';
import { BaseMessage, MessagePayloads, TabInfo } from '../types/messages';
import { Context } from '../types/types';
import { ConnectionManager } from '../utils/connectionManager';
import { Logger } from '../utils/logger';

const logger = new Logger('sidepanel');

export default function App() {
  const [tabId, setTabId] = useState<number | null>(null);
  const [connectionManager, setConnectionManager] = useState<ConnectionManager | null>(null);
  const [contentScriptContext, setContentScriptContext] = useState<Context>('undefined');
  const initialized = React.useRef(false);
  const [uid2InspectResult, setUid2InspectResult] = useState<any | null>(null);

  useEffect(() => {
    if (initialized.current) {
      logger.debug('App already initialized, skipping...');
      return;
    }

    const initializeTab = async () => {
      if (initialized.current) return;

      try {
        const manager = new ConnectionManager('sidepanel', handleMessage);
        manager.connect();
        setConnectionManager(manager);

        // Initialize active tab
        const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
        if (tab?.id) {
          setTabId(tab.id);
          initialized.current = true;
        }

        logger.debug('Initialized', { tab });
      } catch (error) {
        logger.error('Tab initialization failed:', error);
      }
    };

    initializeTab();

    // Monitor storage changes
    chrome.storage.local.onChanged.addListener((changes) => {
      const { activeTabInfo } = changes;
      const newTab = activeTabInfo?.newValue as TabInfo | undefined;
      if (!newTab) return;

      logger.debug('Tab info change detected from storage:', newTab);
      setTabId(newTab.tabId);
    });
  }, []);

  useEffect(() => {
    // Update content script context
    setContentScriptContext(tabId ? `content-${tabId}` : 'undefined');
  }, [tabId]);

  const handleMessage = (message: BaseMessage) => {
    logger.debug('Message received', { type: message.type });

    // Implement other message handling here ...
    switch (message.type) {
      case 'EXECUTE_SCRIPT_RESULT':
        const executeScriptResultPayload =
          message.payload as MessagePayloads['EXECUTE_SCRIPT_RESULT'];
        if (executeScriptResultPayload.success) {
          switch (executeScriptResultPayload.result._inspector) {
            case 'uid2':
              setUid2InspectResult(executeScriptResultPayload.result);
              break;
          }
        }
        break;
    }
  };

  const handleInspectSDKs = () => {
    if (!connectionManager) return;
    const inspectors = [uid2Inspector];

    inspectors.forEach((inspector) => {
      connectionManager.sendMessage('background', {
        type: 'EXECUTE_SCRIPT',
        payload: { script: inspector.toString() },
      });
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="bg-white rounded-lg shadow p-4">
        <h1 className="text-xl font-bold mb-4">Side Panel</h1>
        <button
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
          onClick={() => handleInspectSDKs()}
        >
          Inspect SDKs
        </button>
      </div>
      <div>
        {uid2InspectResult && (
          <div className="mt-4 bg-white rounded-lg shadow p-4">
            <h2 className="text-lg font-bold mb-4">UID2 Inspector</h2>
            <pre>{JSON.stringify(uid2InspectResult, null, 2)}</pre>
          </div>
        )}
      </div>
    </div>
  );
}
