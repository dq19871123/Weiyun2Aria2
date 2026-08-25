// ==UserScript==
// @name         Weiyun2Aria2
// @namespace    https://github.com/dq19871123/Weiyun2Aria2/
// @version      0.0.1
// @description  直接解析微云直链并推送到Aria2进行下载
// @icon         data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMjggMTI4Ij48ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9ImEiIHgxPSIwJSIgeTE9IjAlIiB4Mj0iMTAwJSIgeTI9IjEwMCUiPjxzdG9wIG9mZnNldD0iMCUiIHN0b3AtY29sb3I9IiMwMjg0YzciLz48c3RvcCBvZmZzZXQ9IjUwJSIgc3RvcC1jb2xvcj0iIzI1NjNlYiIvPjxzdG9wIG9mZnNldD0iMTAwJSIgc3RvcC1jb2xvcj0iIzFkNGVkOCIvPjwvbGluZWFyR3JhZGllbnQ+PGxpbmVhckdyYWRpZW50IGlkPSJiIiB4MT0iMCUiIHkxPSIwJSIgeDI9IjAlIiB5Mj0iMTAwJSI+PHN0b3Agb2Zmc2V0PSIwJSIgc3RvcC1jb2xvcj0iIzRhZGU4MCIvPjxzdG9wIG9mZnNldD0iMTAwJSIgc3RvcC1jb2xvcj0iIzEwYjk4MSIvPjwvbGluZWFyR3JhZGllbnQ+PGxpbmVhckdyYWRpZW50IGlkPSJjIiB4MT0iMCUiIHkxPSIwJSIgeDI9IjEwMCUiIHkyPSIxMDAlIj48c3RvcCBvZmZzZXQ9IjAlIiBzdG9wLWNvbG9yPSIjMGYxNzJhIi8+PHN0b3Agb2Zmc2V0PSIxMDAlIiBzdG9wLWNvbG9yPSIjMWUyOTNiIi8+PC9saW5lYXJHcmFkaWVudD48L2RlZnM+PHJlY3Qgd2lkdGg9IjEyOCIgaGVpZ2h0PSIxMjgiIHJ4PSIyOCIgZmlsbD0idXJsKCNhKSIvPjxwYXRoIGQ9Ik00MiA2OGg0NGM5LjkgMCAxOC04LjEgMTgtMTggMC04LjktNi41LTE2LjMtMTUuMS0xNy43Qzg2LjcgMjEuNiA3Ni41IDE0IDY0IDE0Yy0xMC40IDAtMTkuNCA2LjEtMjMuNyAxNUMzMC4zIDMwLjIgMjMgMzguOCAyMyA0OWMwIDEwLjUgOC41IDE5IDE5IDE5eiIgZmlsbD0iI2ZmZiIgb3BhY2l0eT0iLjk1Ii8+PHBhdGggZD0iTTUwIDM0djEyTTY0IDI2djIwTTc4IDM0djEyIiBzdHJva2U9IiMwMjg0YzciIHN0cm9rZS13aWR0aD0iMy41IiBzdHJva2UtbGluZWNhcD0icm91bmQiLz48cGF0aCBkPSJNNjQgODQgNDYgNThoMTFWNDRoMTR2MTRoMTFMNjQgODR6IiBmaWxsPSJ1cmwoI2IpIi8+PHJlY3QgeD0iMjYiIHk9IjkwIiB3aWR0aD0iNzYiIGhlaWdodD0iMjYiIHJ4PSI4IiBmaWxsPSJ1cmwoI2MpIiBzdHJva2U9IiMzOGJkZjgiIHN0cm9rZS13aWR0aD0iMiIvPjx0ZXh0IHg9IjY0IiB5PSIxMDMiIGZvbnQtZmFtaWx5PSJzeXN0ZW0tdWksLWFwcGxlLXN5c3RlbSxzYW5zLXNlcmlmIiBmb250LXdlaWdodD0iOTAwIiBmb250LXNpemU9IjE0IiBmaWxsPSIjMzhiZGY4IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkb21pbmFudC1iYXNlbGluZT0iY2VudHJhbCIgbGV0dGVyLXNwYWNpbmc9IjEiPkFyaWEyPC90ZXh0Pjwvc3ZnPg==
// @author       dq19871123
// @updateURL    https://raw.githubusercontent.com/dq19871123/Weiyun2Aria2/main/Weiyun2Aria2.user.js
// @downloadURL  https://raw.githubusercontent.com/dq19871123/Weiyun2Aria2/main/Weiyun2Aria2.user.js
// @match        *://*.weiyun.com/*
// @grant        GM_xmlhttpRequest
// @grant        GM_log
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_registerMenuCommand
// @run-at       document-end
// @connect      *
// ==/UserScript==

(function () {
	'use strict';

	// ==================== 1. 网页内嵌 Toast 弹窗通知 ====================
	function showToast({ title = '', text = '', type = 'info', timeout = 3500 }) {
		let container = document.getElementById('wy-toast-container');
		if (!container) {
			container = document.createElement('div');
			container.id = 'wy-toast-container';
			container.style.cssText = `
				position: fixed;
				top: 24px;
				right: 24px;
				z-index: 10000000;
				display: flex;
				flex-direction: column;
				gap: 10px;
				pointer-events: none;
				font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
			`;
			document.body.appendChild(container);
		}

		// 根据类型定制状态指示条颜色
		const borderColors = {
			success: '#10b981',
			error: '#ef4444',
			warning: '#f59e0b',
			info: '#3b82f6'
		};
		const borderColor = borderColors[type] || borderColors.info;

		const toast = document.createElement('div');
		toast.style.cssText = `
			pointer-events: auto;
			min-width: 280px;
			max-width: 380px;
			background: #ffffff;
			border-radius: 8px;
			box-shadow: 0 10px 25px rgba(0, 0, 0, 0.12), 0 2px 6px rgba(0, 0, 0, 0.08);
			border-left: 4px solid ${borderColor};
			padding: 12px 16px;
			color: #1e293b;
			display: flex;
			flex-direction: column;
			gap: 4px;
			opacity: 0;
			transform: translateX(30px);
			transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
		`;

		if (title) {
			const titleElem = document.createElement('div');
			titleElem.style.cssText = 'font-weight: 600; font-size: 14px; line-height: 1.4; word-break: break-word;';
			titleElem.textContent = title;
			toast.appendChild(titleElem);
		}

		if (text) {
			const textElem = document.createElement('div');
			textElem.style.cssText = 'font-size: 12px; color: #64748b; line-height: 1.4; word-break: break-word;';
			textElem.textContent = text;
			toast.appendChild(textElem);
		}

		container.appendChild(toast);

		requestAnimationFrame(() => {
			toast.style.opacity = '1';
			toast.style.transform = 'translateX(0)';
		});

		// 倒计时自动淡出销毁
		setTimeout(() => {
			toast.style.opacity = '0';
			toast.style.transform = 'translateX(30px)';
			setTimeout(() => {
				if (toast.parentNode) {
					toast.parentNode.removeChild(toast);
				}
			}, 250);
		}, timeout);
	}

	// ==================== 2. 配置存储与读取 ====================
	const DEFAULT_CONFIG = {
		rpcUrl: 'http://127.0.0.1:6800/jsonrpc',
		rpcSecret: '',
		threads: 10
	};

	function getConfig() {
		return {
			rpcUrl: (GM_getValue('wy_dir_rpc_url', DEFAULT_CONFIG.rpcUrl) || '').trim(),
			rpcSecret: (GM_getValue('wy_dir_rpc_secret', DEFAULT_CONFIG.rpcSecret) || '').trim(),
			threads: Math.min(Math.max(parseInt(GM_getValue('wy_dir_threads', DEFAULT_CONFIG.threads), 10) || 1, 1), 16)
		};
	}

	function saveConfig(cfg) {
		GM_setValue('wy_dir_rpc_url', (cfg.rpcUrl || '').trim());
		GM_setValue('wy_dir_rpc_secret', (cfg.rpcSecret || '').trim());
		GM_setValue('wy_dir_threads', Math.min(Math.max(parseInt(cfg.threads, 10) || 1, 1), 16));
	}

	if (typeof GM_registerMenuCommand !== 'undefined') {
		GM_registerMenuCommand('⚙️ 参数设置', showSettingsModal);
	}

	// ==================== 3. 可视化设置弹窗 ====================
	function showSettingsModal() {
		if (document.getElementById('wy-direct-settings-modal')) return;

		const current = getConfig();

		const modalHtml = `
		<div id="wy-direct-settings-modal" style="
			position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
			background: rgba(0, 0, 0, 0.45); z-index: 9999999;
			display: flex; align-items: center; justify-content: center;
			font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
		">
			<div style="
				background: #ffffff; width: 450px; border-radius: 12px;
				box-shadow: 0 20px 40px rgba(0,0,0,0.2); overflow: hidden;
				display: flex; flex-direction: column; animation: wyFadeIn 0.2s ease-out;
			">
				<div style="
					padding: 16px 20px; background: #f8fafc; border-bottom: 1px solid #e2e8f0;
					display: flex; justify-content: space-between; align-items: center;
				">
					<span style="font-size: 16px; font-weight: 600; color: #1e293b;">Aria2 直推配置</span>
					<span id="wy-modal-close" style="cursor: pointer; font-size: 18px; color: #64748b; font-weight: bold;">✕</span>
				</div>

				<div style="padding: 20px; display: flex; flex-direction: column; gap: 16px;">
					<div>
						<label style="display: block; font-size: 13px; font-weight: 600; color: #334155; margin-bottom: 6px;">
							Aria2 RPC 接口地址 (JSON-RPC)
						</label>
						<input id="wy-cfg-rpcurl" type="text" value="${current.rpcUrl}" placeholder="http://127.0.0.1:6800/jsonrpc" style="
							width: 100%; box-sizing: border-box; padding: 9px 12px; font-size: 13px;
							border: 1px solid #cbd5e1; border-radius: 6px; outline: none;
						" />
					</div>

					<div>
						<label style="display: block; font-size: 13px; font-weight: 600; color: #334155; margin-bottom: 6px;">
							Aria2 RPC Secret (密钥，无则留空)
						</label>
						<input id="wy-cfg-secret" type="password" value="${current.rpcSecret}" placeholder="RPC 密钥" style="
							width: 100%; box-sizing: border-box; padding: 9px 12px; font-size: 13px;
							border: 1px solid #cbd5e1; border-radius: 6px; outline: none;
						" />
					</div>

					<div>
						<label style="display: block; font-size: 13px; font-weight: 600; color: #334155; margin-bottom: 6px;">
							下载分段 / 连接数 (Split & Max-Connections)
						</label>
						<input id="wy-cfg-threads" type="number" min="1" max="16" value="${current.threads}" style="
							width: 100%; box-sizing: border-box; padding: 9px 12px; font-size: 13px;
							border: 1px solid #cbd5e1; border-radius: 6px; outline: none;
						" />
						<div style="font-size: 12px; color: #64748b; margin-top: 4px;">
							该值不宜设置过大，默认值为10，若出现无法下载请适当调小。
						</div>
					</div>
				</div>

				<div style="
					padding: 14px 20px; background: #f8fafc; border-top: 1px solid #e2e8f0;
					display: flex; justify-content: flex-end; gap: 10px;
				">
					<button id="wy-modal-cancel" style="
						padding: 7px 16px; font-size: 13px; font-weight: 500; border-radius: 6px;
						border: 1px solid #cbd5e1; background: #ffffff; color: #475569; cursor: pointer;
					">取消</button>
					<button id="wy-modal-save" style="
						padding: 7px 18px; font-size: 13px; font-weight: 500; border-radius: 6px;
						border: none; background: #2563eb; color: #ffffff; cursor: pointer;
					">保存设置</button>
				</div>
			</div>
		</div>
		<style>
			@keyframes wyFadeIn {
				from { opacity: 0; transform: translateY(-10px); }
				to { opacity: 1; transform: translateY(0); }
			}
			#wy-cfg-rpcurl:focus, #wy-cfg-secret:focus, #wy-cfg-threads:focus {
				border-color: #2563eb !important;
				box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.15);
			}
		</style>
		`;

		const container = document.createElement('div');
		container.innerHTML = modalHtml;
		document.body.appendChild(container);

		const close = () => container.remove();
		document.getElementById('wy-modal-close').addEventListener('click', close);
		document.getElementById('wy-modal-cancel').addEventListener('click', close);
		document.getElementById('wy-modal-save').addEventListener('click', () => {
			const rpcUrl = document.getElementById('wy-cfg-rpcurl').value.trim();
			const rpcSecret = document.getElementById('wy-cfg-secret').value.trim();
			let threads = parseInt(document.getElementById('wy-cfg-threads').value, 10) || 1;
			threads = Math.min(Math.max(threads, 1), 16);

			if (!rpcUrl) {
				alert('Aria2 RPC 接口地址不能为空！');
				return;
			}

			saveConfig({ rpcUrl, rpcSecret, threads });
			close();

			showToast({
				title: '配置已更新',
				text: `Aria2: ${rpcUrl} (线程: ${threads})`,
				type: 'success',
				timeout: 3000
			});
		});
	}

	// ==================== 4. 辅助解析与 Aria2 RPC 推送 ====================
	function extractFileName(url, fallbackName) {
		if (fallbackName && fallbackName.trim()) return fallbackName.trim();
		try {
			const u = new URL(url);
			const fname = u.searchParams.get('fname');
			if (fname) return decodeURIComponent(fname);
			const parts = u.pathname.split('/');
			return decodeURIComponent(parts[parts.length - 1]);
		} catch (_) {}
		return `weiyun_download_${Date.now()}`;
	}

	function parseWeiyunDownloadItems(jsonObj) {
		const items = [];
		function walk(node) {
			if (!node || typeof node !== 'object') return;
			if (node.download_url || node.https_download_url) {
                                // 优先使用 HTTP 规避 564 回源问题
				const directUrl = node.download_url || node.https_download_url;
				items.push({
					url: directUrl,
					cookieName: node.cookie_name || 'FTN5K',
					cookieValue: node.cookie_value || '',
					fileName: node.file_name || ''
				});
				return;
			}
			for (let key of Object.keys(node)) {
				walk(node[key]);
			}
		}
		walk(jsonObj);
		return items;
	}

	function pushTaskToAria2(item, config, fallbackName) {
		const fileName = extractFileName(item.url, fallbackName || item.fileName);
		const cookieHeader = `${item.cookieName}=${item.cookieValue}`;
		const threadsStr = config.threads.toString();

		const options = {
			"out": fileName,
			"user-agent": navigator.userAgent,
			"referer": "https://www.weiyun.com/",
			"use-head": "false",  // 核心经验：跳过 HEAD 探测直接发 GET，防止微云 CDN 切断连接
			"allow-overwrite": "true",
			"auto-file-renaming": "false",
			"header": [`Cookie: ${cookieHeader}`],
			"max-connection-per-server": threadsStr,
			"split": threadsStr,
			"connect-timeout": "30",
			"timeout": "60",
			"max-tries": "5"
		};

		const params = [];
		if (config.rpcSecret) {
			params.push(`token:${config.rpcSecret}`);
		}
		params.push([item.url]);
		params.push(options);

		const payload = {
			id: `WY_DIR_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
			jsonrpc: '2.0',
			method: 'aria2.addUri',
			params: params
		};

		return new Promise((resolve) => {
			GM_xmlhttpRequest({
				method: 'POST',
				url: config.rpcUrl,
				headers: { 'Content-Type': 'application/json' },
				data: JSON.stringify(payload),
				responseType: 'json',
				onload(res) {
					if (res.status === 200 && res.response && !res.response.error) {
						resolve({ success: true, fileName, gid: res.response.result });
					} else {
						const err = (res.response && res.response.error && res.response.error.message) || `HTTP ${res.status}`;
						resolve({ success: false, fileName, error: err });
					}
				},
				onerror(err) {
					resolve({ success: false, fileName, error: '无法连接到 Aria2 RPC 接口' });
				}
			});
		});
	}

	// ==================== 5. 业务核心：原生捕获与解析 ====================
	const injectChunkId = Math.random().toString(36).substring(7);

	location.host === 'www.weiyun.com' && webpackJsonp([7891], {
		[injectChunkId]: function (modules, exports, require) {
			const diskServices = Object.values(require.c)
				.filter(x => x.exports && typeof x.exports.namespace === 'function' && typeof x.exports.namespace('PERSON').fetchUserInfo === 'function')
				.map(x => x.exports.namespace);
			const diskService = diskServices && diskServices[0]('PERSON');

			if (!diskService) return;

			async function downloadDirectly() {
				const selected = document.querySelectorAll('.list-group-item.checked.act');
				const fileNodes = Array.from(selected).map(item => item.__vue__.fileNode).filter(n => !n.isDir());

				if (fileNodes.length === 0) return alert('请选择需要下载的文件');

				const config = getConfig();
				if (!config.rpcUrl) {
					alert('请先配置 Aria2 RPC 接口！');
					showSettingsModal();
					return;
				}

				const expectedBatchCount = Math.ceil(fileNodes.length / 3);
				let interceptedCount = 0;

				const originalOpen = XMLHttpRequest.prototype.open;
				const originalSend = XMLHttpRequest.prototype.send;

				XMLHttpRequest.prototype.open = function (method, url, ...args) {
					this._method = method;
					this._url = url;
					return originalOpen.apply(this, [method, url, ...args]);
				};

				XMLHttpRequest.prototype.send = function (body) {
					if (typeof this._url === 'string' && this._url.includes('DiskFileBatchDownload')) {
						interceptedCount++;
						if (interceptedCount >= expectedBatchCount) {
							XMLHttpRequest.prototype.open = originalOpen;
							XMLHttpRequest.prototype.send = originalSend;
						}

						const absoluteUrl = new URL(this._url, location.origin).href;
						const fileNames = fileNodes.map(n => n.name || n.fileName || '');

                                                // 直接使用 fetch 发起请求：自动继承原生会话与同源凭据
						fetch(absoluteUrl, {
							method: 'POST',
							body: body,
							credentials: 'include',
							headers: { 'Content-Type': 'application/json' }
						})
						.then(r => r.json())
						.then(async (json) => {
							const downloadItems = parseWeiyunDownloadItems(json);
							if (downloadItems.length === 0) {
								showToast({
									title: '解析异常',
									text: '微云已响应但未提取到直链，请在控制台查看返回数据',
									type: 'error',
									timeout: 5000
								});
								console.error('[WeiyunDirect] 微云响应原数据:', json);
								return;
							}

							let okCount = 0;
							for (let i = 0; i < downloadItems.length; i++) {
								const res = await pushTaskToAria2(downloadItems[i], config, fileNames[i]);
								if (res.success) {
									okCount++;
								} else {
									console.error(`[WeiyunDirect] 推送失败: ${res.fileName}, 原因: ${res.error}`);
								}
							}

							showToast({
								title: okCount === downloadItems.length ? '推送成功' : '部分推送失败',
								text: `已提交 ${okCount}/${downloadItems.length} 个任务到 Aria2`,
								type: okCount > 0 ? 'success' : 'error',
								timeout: 4000
							});
						})
						.catch(err => {
							showToast({
								title: '直链获取失败',
								text: err.message,
								type: 'error',
								timeout: 5000
							});
						});

						setTimeout(() => {
							try { this.abort(); } catch (_) {}
						}, 0);
						return;
					}
					return originalSend.apply(this, [body]);
				};

                                // 分批触发微云原生调用
				try {
					for (let i = 0; i < fileNodes.length; i += 3) {
						diskService.fetchDownloadFileInfo({ fileNodes: fileNodes.slice(i, i + 3) });
					}
				} catch (e) {
					XMLHttpRequest.prototype.open = originalOpen;
					XMLHttpRequest.prototype.send = originalSend;
					alert('调用微云组件失败: ' + e.message);
				}
			}

			// ==================== 6. DOM 注入按钮 ====================
			const observeCallback = function (mutations) {
				for (let mutation of mutations) {
					// 右键菜单
					if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
						mutation.addedNodes.forEach(node => {
							if (node.className && node.className.indexOf('mod-bubble-context-menu') > -1 && node.__vue__ && node.__vue__.items.some(e => e.method === 'download')) {
								const contextItems = node.querySelectorAll('.menu-item');
								const newContextItem = document.createElement('li');
								newContextItem.className = 'menu-item';
								newContextItem.innerHTML = '<span class="txt">直推 Aria2</span>';
								newContextItem.addEventListener('click', () => {
									downloadDirectly();
									document.dispatchEvent(new Event('mousedown'));
								});
								contextItems[0].parentNode.insertBefore(newContextItem, contextItems[0].nextSibling);
							}
						});
					}

					// 顶部工具栏
					if (
						mutation.type === 'attributes' &&
						mutation.attributeName === 'style' &&
						mutation.target.className.indexOf('mod-action-wrap-menu') > -1 &&
						mutation.target.style.display !== 'none' &&
						mutation.target.querySelectorAll('#action-item-aria-direct').length === 0
					) {
						const actionItems = mutation.target.querySelectorAll('.action-item');

						// 直推按钮
						const directBtn = document.createElement('div');
						directBtn.id = 'action-item-aria-direct';
						directBtn.className = 'action-item';
						directBtn.innerHTML = '<div class="action-item-con"><i class="icon icon-download"></i><span class="act-txt">直推 Aria2</span></div>';
						directBtn.addEventListener('click', downloadDirectly);

						mutation.target.insertBefore(directBtn, actionItems[0].nextSibling);
						mutation.target.insertBefore(settingBtn, directBtn.nextSibling);
					}
				}
			};
			new MutationObserver(observeCallback).observe(document.body, { attributes: true, childList: true, subtree: true });
		}
	}, [injectChunkId]);
})();