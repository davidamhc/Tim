import React, { useState, useEffect } from 'react';
// Removidas importações de Firebase
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell} from 'recharts'; // Manter para estrutura de gráficos, mas serão estáticos ou com dados mockados simples

// Componente principal da aplicação
function App() {
  // Estado para a seção ativa (principal mecanismo de navegação)
  const [activeSection, setActiveSection] = useState('overview'); // 'overview', 'facilities', 'property', 'energy', 'building', 'cobrança', 'api-import', 'reports', 'approvals'

  // Estados para dados mockados (estáticos para demonstração de UI)
  const [kpis, setKpis] = useState(null);
  const [calendars, setCalendars] = useState(null);
  const [facilitiesRequests, setFacilitiesRequests] = useState([]);
  const [propertyRequests, setPropertyRequests] = useState([]);
  const [energyRequests, setEnergyRequests] = useState([]);
  const [buildingRequests, setBuildingRequests] = useState([]);
  const [cobrançaRequests, setCobrançaRequests] = useState([]);
  const [slaAlerts, setSlaAlerts] = useState([]);
  const [approvalItems, setApprovalItems] = useState([]);

  // Estados para formulários (apenas para exibir os campos)
  const [newFacilitiesRequest, setNewFacilitiesRequest] = useState({ regional: '', serviceType: '', description: '', amount: '', focalPoint: '' });
  const [newPropertyRequest, setNewPropertyRequest] = useState({ propertyType: '', description: '', amount: '', dueDate: '', contractManager: '' });
  const [newEnergyRequest, setNewEnergyRequest] = useState({ energyType: '', description: '', amount: '', focalPointEnergy: '', plantType: '' });
  const [newBuildingRequest, setNewBuildingRequest] = useState({ serviceCategory: '', serviceType: '', property: '', costCenter: '', supplier: '', description: '', amount: '', status: 'Solicitado' });
  const [newCobrançaRequest, setNewCobrançaRequest] = useState({ invoiceNumber: '', supplier: '', amount: '', dueDate: '', paymentProgrammedDate: '', paymentStatus: 'Pendente', sapRegistrationStatus: 'Não Registrado', rejectionReason: '', resolutionDetails: '', responsibleArea: '', notes: '' });
  const [apiImportData, setApiImportData] = useState('');


  // Estados para o modal de mensagem (pode ser útil para feedback de navegação, se necessário)
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  // Estados para a seção de Relatórios e KPIs (filtros)
  
  
  // Estados para a tela de Aprovações (filtros)
  const [filterApprovalType, setFilterApprovalType] = useState('Todos');
  


  // Função para exibir o modal de mensagem
 

  // Efeito para carregar os dados mockados estáticos
  useEffect(() => {
    const staticKpis = {
      orcamento: { compromissado: 56.12, variavel: 40.37, demandaLegal: 3.51 },
      volumetria: {
        qtdTotal: { rc: 150, po: 120, fi: 80, disponibilidades: 100, folhasAprovadas: 90, notasInternalizadas: 70 },
        qtdPorTipoDespesa: [ { name: 'Serviços Profissionais', value: 5 }, { name: 'Property', value: 10 }, { name: 'Manutenção', value: 25 } ],
        qtdNotasInternalizadasPorDespesa: [ { name: 'CAPEX', value: 2 }, { name: 'Facilities', value: 5 } ],
      },
      monthlyExpenses: {
        '2023': [ { month: 'Jan', value: 12000 }, { month: 'Fev', value: 15000 } ],
        '2024': [ { month: 'Jan', value: 13000 }, { month: 'Fev', value: 16000 } ],
      },
      monthlyExpensesByType: [ { month: 'Jan', MANUTENÇÃO: 5000, LIMPEZA: 2000 }, { month: 'Fev', MANUTENÇÃO: 6000, LIMPEZA: 2200 } ],
      budgetAvailability: [ { category: 'Administrativo', orcamento: 50000, comprometido: 35000, saldo: 15000 } ],
      capexByRegion: { 'Janeiro': { TSP: 10000, TSU: 15000 } },
    };
    setKpis(staticKpis);

    const staticCalendars = {
      buildingOpex: ['Até dia 10: envio de evidências', '11 a 25: emissão de RC/PO'],
      facilities: ['De 1 a 21: envio de solicitação despesa'],
    };
    setCalendars(staticCalendars);

    setFacilitiesRequests([
      { id: 'fac-001', regional: 'SP', serviceType: 'Frota', description: 'Manutenção preventiva de veículo Alfa', amount: 1500.75, focalPoint: 'João Silva', status: 'Em Aprovação', createdAt: '2024-05-01T10:00:00Z' },
      { id: 'fac-002', regional: 'RJ', serviceType: 'Viagem', description: 'Passagens aéreas para conferência Beta', amount: 2300.00, focalPoint: 'Maria Souza', status: 'Solicitado', createdAt: '2024-05-02T11:30:00Z' },
    ]);
    setPropertyRequests([
      { id: 'prop-001', propertyType: 'IPTU', description: 'Pagamento IPTU imóvel X', amount: 1200.50, dueDate: '2024-06-15', contractManager: 'Ana Paula', status: 'Em Conferência' },
    ]);
    setEnergyRequests([
      { id: 'energy-001', energyType: 'Geração Distribuída', description: 'Demanda de energia Usina Solar Alpha', amount: 15000.00, focalPointEnergy: 'Fernanda Oliveira', plantType: 'Usina Nova', status: 'Recebido' },
    ]);
    setBuildingRequests([
      { id: 'build-001', serviceCategory: 'Manutenção', serviceType: 'Comprometido', property: 'ADM_CDL', costCenter: 'CC101', supplier: 'Manutenção Rápida Ltda.', description: 'Manutenção preventiva ar condicionado', amount: 2500.00, status: 'Em Validação' },
    ]);
    setCobrançaRequests([
      { id: 'cob-001', invoiceNumber: 'NF-2024-001', supplier: 'Fornecedor A', amount: 3500.00, dueDate: '2024-05-25', paymentStatus: 'Programado', sapRegistrationStatus: 'Registrado', notes: 'Pagamento agendado.' },
      { id: 'cob-002', invoiceNumber: 'NF-2024-002', supplier: 'Fornecedor B', amount: 1800.00, dueDate: '2024-05-18', paymentStatus: 'Pendente', sapRegistrationStatus: 'Não Registrado', notes: 'NF com dados inconsistentes.' },
    ]);
    setSlaAlerts([
        { id: 'sla-001', type: 'Facilities', description: "Requisição de Facilities 'Frota' pendente há 5 dias.", status: 'Atrasado', date: '2024-05-20' },
        { id: 'sla-002', type: 'Property', description: "Pagamento de Property 'IPTU' vence em 3 dias.", status: 'Próximo do Vencimento', date: '2024-05-29' },
    ]);
    setApprovalItems([
        { id: 'appr-001', type: 'Facilities', description: 'Requisição: Manutenção Veicular (SP)', amount: 1500.75, status: 'Em Aprovação' },
        { id: 'appr-002', type: 'Property', description: 'Solicitação: IPTU Imóvel X (Venc: 2024-06-15)', amount: 1200.50, status: 'Em Conferência' },
    ]);
  }, []);


  // Manipuladores de mudança para formulários (apenas atualizam o estado local, sem submissão real)
  const handleInputChange = (setter) => (e) => {
    const { name, value } = e.target;
    setter(prev => ({ ...prev, [name]: value }));
  };

  // Funções de ação (Adicionar, Atualizar Status, Deletar, Analisar, Importar, Exportar)
  // Serão simplificadas para apenas mostrar uma mensagem ou fazer nada,
  // pois o foco é na navegação.
  const placeholderAction = (actionName, itemName = '') => {
    // showMessageBox(`${actionName} ${itemName} - Funcionalidade não implementada neste protótipo.`);
    console.log(`${actionName} ${itemName} - Funcionalidade não implementada neste protótipo.`);
  };


  // Cores para os gráficos (mantidas para consistência visual se os gráficos forem mockados)
  const PIE_COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
  

  // Função para renderizar a seção de visão geral
  const renderOverview = () => (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Visão Geral da Célula Financeira</h2>
      <p className="text-gray-700 mb-6">Esta é a tela inicial com um resumo dos principais indicadores e alertas.</p>

      <h3 className="text-xl font-bold text-gray-800 mt-6 mb-3">Alertas de SLA (Exemplo)</h3>
      {slaAlerts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {slaAlerts.map((alert, index) => (
            <div key={index} className={`p-4 rounded-lg shadow-sm border ${
              alert.status === 'Vencido' ? 'bg-red-100 border-red-400 text-red-800' :
              alert.status === 'Próximo do Vencimento' ? 'bg-yellow-100 border-yellow-400 text-yellow-800' :
              'bg-orange-100 border-orange-400 text-orange-800'
            }`}>
              <p className="font-bold">{alert.status} - {alert.type}</p>
              <p className="text-sm">{alert.description}</p>
              <p className="text-xs text-gray-600">Data: {alert.date}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-600 mb-8">Nenhum alerta de SLA no momento.</p>
      )}

      <h3 className="text-xl font-bold text-gray-800 mt-6 mb-3">KPIs e Volumetria (Exemplo)</h3>
      {kpis ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-blue-50 p-4 rounded-lg shadow-inner">
            <h4 className="text-lg font-semibold text-blue-800 mb-2">Distribuição de Orçamento</h4>
            <p className="text-blue-700">Comprometido: {kpis.orcamento.compromissado}%</p>
            <p className="text-blue-700">Variável: {kpis.orcamento.variavel}%</p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg shadow-inner">
            <h4 className="text-lg font-semibold text-green-800 mb-2">Volumetria Geral</h4>
            <p className="text-green-700">RC: {kpis.volumetria.qtdTotal.rc}</p>
            <p className="text-green-700">PO: {kpis.volumetria.qtdTotal.po}</p>
          </div>
        </div>
      ) : (
        <p className="text-gray-600">Carregando KPIs de exemplo...</p>
      )}

      <h3 className="text-xl font-bold text-gray-800 mt-6 mb-3">Calendário de Atividades (Exemplo)</h3>
      {calendars ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Object.entries(calendars).map(([key, value]) => (
            <div key={key} className="bg-indigo-50 p-4 rounded-lg shadow-inner">
              <h4 className="text-lg font-semibold text-indigo-800 mb-2 capitalize">
                {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
              </h4>
              <ul className="list-disc list-inside text-indigo-700">
                {value.map((item, index) => ( <li key={index}>{item}</li> ))}
              </ul>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-600">Carregando calendários de exemplo...</p>
      )}
    </div>
  );

  const renderSectionWithFormAndList = (title, description, formState, handleFormChange, formFields, listItems, itemCardComponent, addActionName) => (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">{title}</h2>
      <p className="text-gray-700 mb-6">{description}</p>

      {/* Formulário Estático */}
      <div className={`bg-${formFields.theme}-50 p-6 rounded-lg shadow-inner mb-8`}>
        <h3 className={`text-xl font-semibold text-${formFields.theme}-800 mb-4`}>Adicionar Nova Requisição (Demonstração)</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {formFields.fields.map(field => (
            <div key={field.name} className={field.colSpan === 2 ? "md:col-span-2" : ""}>
              <label htmlFor={`${formFields.idPrefix}-${field.name}`} className="block text-sm font-medium text-gray-700">{field.label}</label>
              {field.type === 'select' ? (
                <select
                  id={`${formFields.idPrefix}-${field.name}`}
                  name={field.name}
                  value={formState[field.name]}
                  onChange={handleFormChange}
                  className={`mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-${formFields.theme}-500 focus:border-${formFields.theme}-500 sm:text-sm`}
                >
                  <option value="">Selecione</option>
                  {field.options.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                </select>
              ) : field.type === 'textarea' ? (
                <textarea
                  id={`${formFields.idPrefix}-${field.name}`}
                  name={field.name}
                  value={formState[field.name]}
                  onChange={handleFormChange}
                  rows="3"
                  className={`mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-${formFields.theme}-500 focus:border-${formFields.theme}-500 sm:text-sm`}
                  placeholder={field.placeholder}
                ></textarea>
              ) : (
                <input
                  type={field.type}
                  id={`${formFields.idPrefix}-${field.name}`}
                  name={field.name}
                  value={formState[field.name]}
                  onChange={handleFormChange}
                  className={`mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-${formFields.theme}-500 focus:border-${formFields.theme}-500 sm:text-sm`}
                  placeholder={field.placeholder}
                  step={field.type === 'number' ? "0.01" : undefined}
                />
              )}
            </div>
          ))}
        </div>
        <button
          onClick={() => placeholderAction(`Adicionar ${addActionName}`)}
          className={`mt-6 w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-${formFields.theme}-600 hover:bg-${formFields.theme}-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-${formFields.theme}-500 transition-colors duration-300`}
        >
          Adicionar Requisição (Demonstração)
        </button>
      </div>

      {/* Lista Estática */}
      <h3 className="text-xl font-semibold text-gray-800 mb-4">Requisições Ativas (Exemplo)</h3>
      {listItems.length === 0 ? (
        <p className="text-gray-600">Nenhuma requisição de exemplo.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {listItems.map(item => itemCardComponent(item, formFields.theme))}
        </div>
      )}
    </div>
  );

  const facilitiesFormFields = {
    idPrefix: 'facilities',
    theme: 'blue',
    fields: [
      { name: 'regional', label: 'Regional', type: 'text', placeholder: 'Ex: TRJ' },
      { name: 'serviceType', label: 'Tipo de Serviço', type: 'select', options: [ {value: "Frota", label: "Frota"}, {value: "Serviço Cross", label: "Serviço Cross"} ] },
      { name: 'description', label: 'Descrição', type: 'textarea', placeholder: 'Detalhes...', colSpan: 2 },
      { name: 'amount', label: 'Valor (R$)', type: 'number', placeholder: '0.00' },
      { name: 'focalPoint', label: 'Focal Point', type: 'text', placeholder: 'Nome' },
    ]
  };
  const facilitiesItemCard = (request, theme) => (
    <div key={request.id} className="bg-gray-50 p-4 rounded-lg shadow-sm border border-gray-200">
      <p className={`text-lg font-bold text-${theme}-700`}>{request.serviceType}</p>
      <p className="text-sm text-gray-600">Regional: {request.regional}</p>
      <p className="text-md text-gray-800 mt-2">{request.description}</p>
      <p className={`text-md font-semibold text-green-600`}>Valor: R$ {request.amount ? request.amount.toFixed(2) : '0.00'}</p>
      <p className={`text-sm font-medium text-purple-700`}>Status: {request.status}</p>
      <button onClick={() => setActiveSection('overview')} className="mt-2 px-3 py-1 bg-gray-300 text-gray-700 text-sm rounded-md hover:bg-gray-400">Ver Detalhes (Navegar)</button>
    </div>
  );

  const propertyFormFields = {
    idPrefix: 'property',
    theme: 'green',
    fields: [
        { name: 'propertyType', label: 'Tipo de Property', type: 'select', options: [{value: "IPTU", label: "IPTU"}, {value: "Taxas", label: "Taxas"}]},
        { name: 'amount', label: 'Valor (R$)', type: 'number', placeholder: '0.00' },
        { name: 'description', label: 'Descrição', type: 'textarea', placeholder: 'Detalhes...', colSpan: 2 },
        { name: 'dueDate', label: 'Data de Vencimento', type: 'date' },
        { name: 'contractManager', label: 'Gestor do Contrato', type: 'text', placeholder: 'Nome' },
    ]
  };
  const propertyItemCard = (request, theme) => (
    <div key={request.id} className="bg-gray-50 p-4 rounded-lg shadow-sm border border-gray-200">
      <p className={`text-lg font-bold text-${theme}-700`}>{request.propertyType}</p>
      <p className="text-sm text-gray-600">Vencimento: {request.dueDate}</p>
      <p className={`text-md font-semibold text-blue-600`}>Valor: R$ {request.amount ? request.amount.toFixed(2) : '0.00'}</p>
      <p className={`text-sm font-medium text-purple-700`}>Status: {request.status}</p>
      <button onClick={() => setActiveSection('overview')} className="mt-2 px-3 py-1 bg-gray-300 text-gray-700 text-sm rounded-md hover:bg-gray-400">Ver Detalhes (Navegar)</button>
    </div>
  );

  const energyFormFields = {
    idPrefix: 'energy',
    theme: 'green',
    fields: [
        { name: 'energyType', label: 'Tipo de Energy', type: 'select', options: [{value: "Geração Distribuída", label: "Geração Distribuída"}, {value: "Consumo", label: "Consumo"}]},
        { name: 'amount', label: 'Valor (R$)', type: 'number', placeholder: '0.00' },
        { name: 'description', label: 'Descrição', type: 'textarea', placeholder: 'Detalhes...', colSpan: 2 },
        { name: 'focalPointEnergy', label: 'Focal Point', type: 'text', placeholder: 'Nome' },
        { name: 'plantType', label: 'Tipo de Usina', type: 'select', options: [{value: "Usina Nova", label: "Usina Nova"}, {value: "Usina Existente", label: "Usina Existente"}]},
    ]
  };
  const energyItemCard = (request, theme) => (
    <div key={request.id} className="bg-gray-50 p-4 rounded-lg shadow-sm border border-gray-200">
      <p className={`text-lg font-bold text-${theme}-700`}>{request.energyType}</p>
      <p className="text-sm text-gray-600">Usina: {request.plantType}</p>
      <p className={`text-md font-semibold text-blue-600`}>Valor: R$ {request.amount ? request.amount.toFixed(2) : '0.00'}</p>
      <p className={`text-sm font-medium text-purple-700`}>Status: {request.status}</p>
      <button onClick={() => setActiveSection('overview')} className="mt-2 px-3 py-1 bg-gray-300 text-gray-700 text-sm rounded-md hover:bg-gray-400">Ver Detalhes (Navegar)</button>
    </div>
  );

  const buildingFormFields = {
    idPrefix: 'building',
    theme: 'yellow',
    fields: [
        { name: 'serviceCategory', label: 'Categoria', type: 'select', options: [{value: "Manutenção", label: "Manutenção"}, {value: "Limpeza", label: "Limpeza"}]},
        { name: 'serviceType', label: 'Tipo Despesa', type: 'select', options: [{value: "Comprometido", label: "Comprometido"}, {value: "Variavel", label: "Variável"}]},
        { name: 'property', label: 'Imóvel', type: 'text', placeholder: 'Ex: ADM_CDL' },
        { name: 'costCenter', label: 'Centro de Custo', type: 'text', placeholder: 'Ex: XX' },
        { name: 'supplier', label: 'Fornecedor', type: 'text', placeholder: 'Nome' },
        { name: 'amount', label: 'Valor (R$)', type: 'number', placeholder: '0.00' },
        { name: 'description', label: 'Descrição', type: 'textarea', placeholder: 'Detalhes...', colSpan: 2 },
    ]
  };
  const buildingItemCard = (request, theme) => (
    <div key={request.id} className="bg-gray-50 p-4 rounded-lg shadow-sm border border-gray-200">
      <p className={`text-lg font-bold text-${theme}-700`}>{request.serviceCategory} ({request.serviceType})</p>
      <p className="text-sm text-gray-600">Imóvel: {request.property}</p>
      <p className={`text-md font-semibold text-blue-600`}>Valor: R$ {request.amount ? request.amount.toFixed(2) : '0.00'}</p>
      <p className={`text-sm font-medium text-purple-700`}>Status: {request.status}</p>
      <button onClick={() => setActiveSection('overview')} className="mt-2 px-3 py-1 bg-gray-300 text-gray-700 text-sm rounded-md hover:bg-gray-400">Ver Detalhes (Navegar)</button>
    </div>
  );

  const cobrançaFormFields = {
    idPrefix: 'cobrança',
    theme: 'yellow',
    fields: [
        { name: 'invoiceNumber', label: 'Número da NF', type: 'text', placeholder: 'Ex: 123456' },
        { name: 'supplier', label: 'Fornecedor', type: 'text', placeholder: 'Nome' },
        { name: 'amount', label: 'Valor (R$)', type: 'number', placeholder: '0.00' },
        { name: 'dueDate', label: 'Data de Vencimento', type: 'date' },
        { name: 'paymentProgrammedDate', label: 'Data Programação Pagamento', type: 'date' },
        { name: 'paymentStatus', label: 'Status Pagamento', type: 'select', options: [{value: "Pendente", label: "Pendente"}, {value: "Programado", label: "Programado"}] },
        { name: 'sapRegistrationStatus', label: 'Status SAP', type: 'select', options: [{value: "Não Registrado", label: "Não Registrado"}, {value: "Registrado", label: "Registrado"}] },
        { name: 'responsibleArea', label: 'Área Responsável (Vencidos)', type: 'text', placeholder: 'Ex: Contas a Pagar' },
        { name: 'rejectionReason', label: 'Motivo da Recusa', type: 'textarea', placeholder: 'Se houver...', colSpan: 2 },
        { name: 'resolutionDetails', label: 'Detalhes da Regularização', type: 'textarea', placeholder: 'Ações...', colSpan: 2 },
        { name: 'notes', label: 'Observações', type: 'textarea', placeholder: 'Outras...', colSpan: 2 },
    ]
  };
  const cobrançaItemCard = (request, theme) => (
    <div key={request.id} className="bg-gray-50 p-4 rounded-lg shadow-sm border border-gray-200">
      <p className={`text-lg font-bold text-${theme}-700`}>NF: {request.invoiceNumber}</p>
      <p className="text-sm text-gray-600">Fornecedor: {request.supplier}</p>
      <p className={`text-md font-semibold text-blue-600`}>Valor: R$ {request.amount ? request.amount.toFixed(2) : '0.00'}</p>
      <p className={`text-sm font-medium text-indigo-700`}>Status Pagamento: {request.paymentStatus}</p>
      <p className={`text-sm font-medium text-orange-700`}>Status SAP: {request.sapRegistrationStatus}</p>
      <button onClick={() => placeholderAction('Analisar Risco', `NF ${request.invoiceNumber}`)} className={`mt-2 mr-2 px-3 py-1 bg-yellow-500 text-white text-sm rounded-md hover:bg-yellow-600`}>Analisar Risco (Demo)</button>
      <button onClick={() => setActiveSection('overview')} className="mt-2 px-3 py-1 bg-gray-300 text-gray-700 text-sm rounded-md hover:bg-gray-400">Ver Detalhes (Navegar)</button>
    </div>
  );

  // Função para renderizar a seção de Importação via API (estática)
  const renderApiImport = () => (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Importação de Dados via API (Demonstração)</h2>
      <p className="text-gray-700 mb-6">
        Esta tela simula a interface para importação de dados em lote.
      </p>
      <div className="bg-gray-50 p-6 rounded-lg shadow-inner mb-8">
        <label htmlFor="api-data" className="block text-sm font-medium text-gray-700 mb-2">Dados JSON (Exemplo):</label>
        <textarea
          id="api-data"
          rows="5"
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm sm:text-sm font-mono"
          placeholder={`[ { "campo": "valor1" }, { "campo": "valor2" } ]`}
          value={apiImportData}
          onChange={(e) => setApiImportData(e.target.value)}
          readOnly={false} // Permitir edição para simular a colagem
        ></textarea>
        <button
          onClick={() => placeholderAction('Importar Dados via API')}
          className="mt-6 w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Importar Dados (Demonstração)
        </button>
      </div>
    </div>
  );

  // Função para renderizar a seção de Relatórios e KPIs (estática)
  const renderReportsAndKPIs = () => (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Relatórios e KPIs (Demonstração)</h2>
      <p className="text-gray-700 mb-6">
        Esta tela apresentaria gráficos e opções de download dos dados.
      </p>
      {kpis ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Gráfico de Pizza Estático */}
          <div className="bg-blue-50 p-4 rounded-lg shadow-inner">
            <h3 className="text-xl font-semibold text-blue-800 mb-3">Distribuição de Orçamento (Exemplo)</h3>
            <div className="text-center text-gray-500 py-10">
              [Espaço para Gráfico de Pizza: Comp: {kpis.orcamento.compromissado}%, Var: {kpis.orcamento.variavel}%]
            </div>
             <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie data={[{ name: 'Comprometido', value: kpis.orcamento.compromissado }, { name: 'Variável', value: kpis.orcamento.variavel }]} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} fill="#8884d8" label>
                    <Cell fill={PIE_COLORS[0]} />
                    <Cell fill={PIE_COLORS[1]} />
                </Pie>
                <Tooltip /> <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
          {/* Gráfico de Barras Estático */}
          <div className="bg-green-50 p-4 rounded-lg shadow-inner">
            <h3 className="text-xl font-semibold text-green-800 mb-3">Qtd por Tipo de Despesa (Exemplo)</h3>
            <div className="text-center text-gray-500 py-10">
              [Espaço para Gráfico de Barras: {kpis.volumetria.qtdPorTipoDespesa.map(d => `${d.name}: ${d.value}`).join(', ')}]
            </div>
            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={kpis.volumetria.qtdPorTipoDespesa}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" /> <YAxis /> <Tooltip /> <Legend />
                    <Bar dataKey="value" fill="#82ca9d" />
                </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      ) : <p>Carregando exemplos de KPIs...</p>}
      <h3 className="text-xl font-bold text-gray-800 mt-8 mb-3">Download de Dados (Demonstração)</h3>
      <div className="flex gap-2">
        <button onClick={() => placeholderAction('Download PDF')} className="px-3 py-1 bg-red-500 text-white text-sm rounded-md hover:bg-red-600">Download PDF (Demo)</button>
        <button onClick={() => placeholderAction('Download Excel')} className="px-3 py-1 bg-green-500 text-white text-sm rounded-md hover:bg-green-600">Download Excel (Demo)</button>
      </div>
    </div>
  );

  // Função para renderizar a seção de Aprovações (estática)
  const renderApprovalsScreen = () => {
    const filteredItems = approvalItems.filter(item => {
        const matchesType = filterApprovalType === 'Todos' || item.type === filterApprovalType;
        // Adicionar mais lógica de filtro estático se necessário
        return matchesType;
    });

    return (
      <div className="p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Aprovações Pendentes (Demonstração)</h2>
        <p className="text-gray-700 mb-6">
          Esta tela listaria itens que necessitam de aprovação.
        </p>
        {/* Controles de Filtro Estáticos */}
        <div className="bg-gray-100 p-4 rounded-lg shadow-inner mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label htmlFor="filter-type" className="block text-sm font-medium text-gray-700">Tipo:</label>
            <select id="filter-type" value={filterApprovalType} onChange={(e) => setFilterApprovalType(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm">
              <option value="Todos">Todos</option>
              <option value="Facilities">Facilities</option>
              <option value="Property">Property</option>
            </select>
          </div>
          {/* Adicionar mais filtros estáticos se necessário */}
        </div>

        {filteredItems.length === 0 ? (
          <p className="text-gray-600">Nenhum item de exemplo para aprovação.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredItems.map(item => (
              <div key={item.id} className="bg-gray-50 p-4 rounded-lg shadow-sm border border-gray-200">
                <p className="text-lg font-bold text-gray-800">{item.type}</p>
                <p className="text-md text-gray-700">{item.description}</p>
                <p className="text-md font-semibold text-blue-600">Valor: R$ {item.amount ? item.amount.toFixed(2) : '0.00'}</p>
                <p className="text-sm font-medium text-purple-700">Status Atual: {item.status}</p>
                <button onClick={() => placeholderAction('Aprovar Item', item.id)} className="mt-4 px-3 py-1 bg-green-600 text-white text-sm rounded-md hover:bg-green-700">Aprovar (Demo)</button>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };


  // Função para renderizar o conteúdo da seção ativa
  const renderSectionContent = () => {
    switch (activeSection) {
      case 'overview': return renderOverview();
      case 'facilities': return renderSectionWithFormAndList('Gerenciamento de Facilities', 'Adicione e visualize requisições de Facilities (demonstração).', newFacilitiesRequest, handleInputChange(setNewFacilitiesRequest), facilitiesFormFields, facilitiesRequests, facilitiesItemCard, 'Facilities');
      case 'property': return renderSectionWithFormAndList('Gerenciamento de Property', 'Adicione e visualize requisições de Property (demonstração).', newPropertyRequest, handleInputChange(setNewPropertyRequest), propertyFormFields, propertyRequests, propertyItemCard, 'Property');
      case 'energy': return renderSectionWithFormAndList('Gerenciamento de Energy', 'Adicione e visualize requisições de Energy (demonstração).', newEnergyRequest, handleInputChange(setNewEnergyRequest), energyFormFields, energyRequests, energyItemCard, 'Energy');
      case 'building': return renderSectionWithFormAndList('Gerenciamento de Building', 'Adicione e visualize requisições de Building (demonstração).', newBuildingRequest, handleInputChange(setNewBuildingRequest), buildingFormFields, buildingRequests, buildingItemCard, 'Building');
      case 'cobrança': return renderSectionWithFormAndList('Gerenciamento de Cobrança', 'Adicione e visualize requisições de Cobrança (demonstração).', newCobrançaRequest, handleInputChange(setNewCobrançaRequest), cobrançaFormFields, cobrançaRequests, cobrançaItemCard, 'Cobrança');
      case 'api-import': return renderApiImport();
      case 'reports': return renderReportsAndKPIs();
      case 'approvals': return renderApprovalsScreen();
      default: return <p>Seção não encontrada.</p>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 font-sans antialiased">
      {/* Modal de Mensagem */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-sm w-full">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Mensagem</h3>
            <p className="text-gray-700 mb-6">{modalMessage}</p>
            <button
              onClick={() => setShowModal(false)}
              className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Fechar
            </button>
          </div>
        </div>
      )}

      {/* Cabeçalho */}
      <header className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-4 shadow-lg">
        <div className="container mx-auto flex justify-between items-center flex-wrap">
          <h1 className="text-3xl font-bold mb-2 md:mb-0">Célula Financeira TIM (Protótipo de Fluxo)</h1>
          <nav className="w-full md:w-auto">
            <ul className="flex flex-wrap justify-center md:justify-start space-x-2 md:space-x-4">
              {['overview', 'facilities', 'property', 'energy', 'building', 'cobrança', 'api-import', 'reports', 'approvals'].map(section => (
                <li key={section}>
                  <button
                    onClick={() => setActiveSection(section)}
                    className={`px-3 py-1 md:px-4 md:py-2 rounded-md transition-colors duration-300 text-sm md:text-base ${
                      activeSection === section ? 'bg-blue-700 text-white' : 'hover:bg-blue-700 hover:text-white'
                    }`}
                  >
                    {section.charAt(0).toUpperCase() + section.slice(1).replace('-', ' ')}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </header>

      {/* Conteúdo principal */}
      <main className="container mx-auto my-8 p-4">
        {renderSectionContent()}
      </main>

      {/* Rodapé */}
      <footer className="bg-gray-800 text-white p-4 text-center mt-8">
        <p>&copy; 2025 Célula Financeira TIM. Protótipo para validação de fluxo.</p>
      </footer>
    </div>
  );
}

export default App;
