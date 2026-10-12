/* Candidate DOM adapters. These are NOT claims of live authenticated verification. */
globalThis.BRIDGE_PROVIDERS = {
  gpt: {name:'ChatGPT', url:'https://chatgpt.com/', hosts:['chatgpt.com'],
    input:['#prompt-textarea','[data-composer-markdown][contenteditable="true"][role="textbox"]'], send:['button[data-testid="send-button"]','button[aria-label="Send prompt"]','button[aria-label="发送"]'], answer:['[data-message-author-role="assistant"]','[data-markdown-text-style="assistant-message"]'], stop:['button[data-testid="stop-button"]','button[aria-label="停止"]']},
  claude: {name:'Claude', url:'https://claude.ai/new', hosts:['claude.ai'],
    input:['[contenteditable="true"][data-testid="chat-input"]','[contenteditable="true"].ProseMirror'], send:['button[aria-label="Send message"]','button[aria-label="发送消息"]'], answer:['[data-is-streaming] .font-claude-response','.font-claude-response'], stop:['button[aria-label="Stop response"]','button[aria-label="停止回复"]']},
  gemini: {name:'Gemini', url:'https://gemini.google.com/app', hosts:['gemini.google.com'],
    input:['rich-textarea [contenteditable="true"]'], send:['button.send-button','button[aria-label="Send message"]','button[aria-label="发送"]'], answer:['model-response .markdown','model-response message-content'], stop:['button[aria-label="Stop response"]','button[aria-label="停止回答"]']},
  ds: {name:'DeepSeek', url:'https://chat.deepseek.com/', hosts:['chat.deepseek.com'],
    input:['#chat-input','textarea[placeholder*="DeepSeek"]'], send:['button[aria-label="Send message"]','[role="button"][aria-label="发送"]','[role="button"].ds-button--primary.ds-button--circle:has(svg path[d^="M8.3125 0.980206"])'], answer:['.ds-assistant-message-main-content'], stop:['button[aria-label="Stop generating"]','[role="button"][aria-label="停止生成"]','[role="button"].ds-button--primary.ds-button--circle:has(svg path[d^="M2 4.88"])','[role="button"].ds-button--primary.ds-button--circle:has(.ds-loading)']},
  kimi: {name:'Kimi', url:'https://www.kimi.com/', hosts:['www.kimi.com','kimi.com','kimi.moonshot.cn'],
    input:['.chat-input-editor[contenteditable="true"]','[contenteditable="true"][data-lexical-editor="true"]'], send:['button.send-button','.send-button[role="button"]','.send-button-container:has(svg[name="Send"])'], answer:['.segment-assistant .markdown','.assistant-content .markdown'], stop:['button[aria-label="停止生成"]']},
  doubao: {name:'豆包', url:'https://www.doubao.com/chat/', hosts:['www.doubao.com'],
    input:['textarea[data-testid="chat_input_input"]','textarea[placeholder*="豆包"]','.tiptap.ProseMirror[contenteditable="true"]'], send:['button[data-testid="chat_input_send_button"]'], answer:['[data-testid="receive_message"] [data-testid="message_text_content"]','[data-testid="receive_message"] [class*="markdown"]','[data-testid="message_text_content"][data-role="assistant"]'], stop:['button[data-testid="chat_input_stop_button"]','[data-testid="receive_message"] [data-streaming="true"]']},
  glm: {name:'智谱清言', url:'https://chatglm.cn/', hosts:['chatglm.cn'],
    input:['textarea[placeholder*="清言"]','.input-box [contenteditable="true"]','.input-box-inner textarea'], send:['button[aria-label="发送"]','.send-btn'], answer:['.answer .markdown-body','.assistant-message .markdown-body'], stop:['button[aria-label="停止生成"]']}
};
