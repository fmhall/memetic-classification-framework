import React from 'react';

interface ComponentData {
  id: number;
  memeId: number;
  name: string;
  description: string;
  strength: number;
  notes: string;
}

interface MemeDetailProps {
  meme: {
    id: number;
    name: string;
    description: string;
    coreArchitecture: ComponentData | null;
    transmissionMechanisms: ComponentData | null;
    selectionDefense: ComponentData | null;
    evolutionPattern: ComponentData | null;
    socialNetworkEffects: ComponentData | null;
    emotionalHooks: ComponentData | null;
  };
}

export default function MemeDetail({ meme }: MemeDetailProps) {
  const renderComponent = (title: string, component: ComponentData | null) => {
    // Display a placeholder if component is null
    if (!component) {
      return (
        <div className="mb-8 bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-3">{title}</h3>
          <div className="mb-4">
            <p className="text-gray-500 italic">No data available</p>
          </div>
          <div className="flex items-center mb-4">
            <span className="text-sm font-medium text-gray-700 mr-2">Strength:</span>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div className="bg-gray-300 h-2.5 rounded-full" style={{ width: '0%' }}></div>
            </div>
            <span className="ml-2 text-sm text-gray-600">0/5</span>
          </div>
        </div>
      );
    }
    
    return (
      <div className="mb-8 bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-3">{title}</h3>
        <div className="mb-4">
          <h4 className="font-semibold text-gray-700">{component.name}</h4>
          <p className="text-gray-600 mt-1">{component.description}</p>
        </div>
        <div className="flex items-center mb-4">
          <span className="text-sm font-medium text-gray-700 mr-2">Strength:</span>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div 
              className="bg-indigo-600 h-2.5 rounded-full" 
              style={{ width: `${component.strength * 20}%` }}
            ></div>
          </div>
          <span className="ml-2 text-sm text-gray-600">{component.strength}/5</span>
        </div>
        {component.notes && (
          <div className="mt-3 p-3 bg-gray-50 rounded-md">
            <p className="text-sm text-gray-700">{component.notes}</p>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8 bg-white rounded-lg shadow-md p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">{meme.name}</h1>
        <p className="text-xl text-gray-600">{meme.description}</p>
      </div>
      
      {renderComponent("Core Architecture", meme.coreArchitecture)}
      {renderComponent("Transmission Mechanisms", meme.transmissionMechanisms)}
      {renderComponent("Selection & Defense", meme.selectionDefense)}
      {renderComponent("Evolution Pattern", meme.evolutionPattern)}
      {renderComponent("Social Network Effects", meme.socialNetworkEffects)}
      {renderComponent("Emotional Hooks", meme.emotionalHooks)}
    </div>
  );
}