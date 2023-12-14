from flask import Flask, request, jsonify
from flask_cors import CORS  # Import the CORS extension
import pandas as pd
import numpy as np
from sklearn.preprocessing import MinMaxScaler
import os
import pickle


def performProcessing(data):
    df = pd.read_csv("finaldata.csv")
    processed_df = pd.read_csv("PreprocessedData.csv")
    AdminName = data['AdminName']
    GeoRegion = data['GeoRegion']
    GeoSubreg = data['GeoSubreg']
    LendCat = data['LendCat']
    VarDesc = data['VarDesc']
    UrbanPop = data['UrbanPop']
    RuralPop = data['RuralPop']
    TotalPop = data['TotalPop']
    UrbanLA = data['UrbanLA']
    RuralLA = data['RuralLA']
    TotalLA = data['TotalLA']
    AdminDf = df[df['AdminName'] == AdminName]
    if len(AdminDf) > 0:
        GeoRegionDf = AdminDf[AdminDf['GeoRegion'] == GeoRegion]
        if len(GeoRegionDf) > 0:
            GeoSubregDf = GeoRegionDf[GeoRegionDf['GeoSubreg'] == GeoSubreg]
            if len(GeoSubregDf) > 0:
                LendCatDf = GeoSubregDf[GeoSubregDf["LendCat"] == LendCat]
                if len(LendCatDf) > 0:
                    VarDescDf = LendCatDf[LendCatDf["VarDesc"] == VarDesc]
                    data = np.array([UrbanPop,RuralPop,UrbanLA, RuralLA , TotalLA ])
                    with open('saved_steps.pkl', 'rb') as file:
                        loaded_model = pickle.load(file)
                    IncomeGroup = 1
                    data = np.array([[GeoSubreg, IncomeGroup,VarDesc, UrbanPop, RuralPop, RuralLA, UrbanLA, TotalLA ]])
                    regressor_loaded=loaded_model['model']
                    classifier_loaded = loaded_model['classifier']
                    le_Geo=loaded_model['le_Geo']
                    le_Inc=loaded_model['le_Inc']
                    le_Var=loaded_model['le_Var']
                    data[:,0] = le_Geo.transform(data[:,0])
                    data[:,2] = le_Var.transform(data[:,2])
                    data=data.astype(float)
                    predictions = regressor_loaded.predict(data)
                    classification_data = np.array([[GeoSubreg,VarDesc,UrbanPop,RuralPop,RuralLA, UrbanLA,TotalLA,predictions[0]  ]])
                    classification_data[:,0] = le_Geo.transform(classification_data[:,0])
                    classification_data[:,1] = le_Var.transform(classification_data[:,1])
                    classification_data=classification_data.astype(float)
                    class_pred = classifier_loaded.predict(classification_data)
                    prediction = [predictions[0], class_pred[0]]
                    return prediction
                else:
                    return "Invalid Var Desc"
            else:
                return "Invalid GeoSubreg"
        else:
            return "Invalid Geo egion" 
    else:
        return "Invalid AdminName"
def create_app(test_config=None):
    # create and configure the app
    app = Flask(__name__, instance_relative_config=True)
    CORS(app)
    @app.route('/hello')
    def hello():
        return 'Hello, World!'
    
    @app.route('/api/Data', methods=['POST'])
    def handle_post_request():
        print(request)
        data = request.get_json()
        predictions = performProcessing(data)
        # Respond with a JSON message
        return jsonify({'message': 'POST request received successfully', 'Linear_pred': predictions[0], 'classifier_pred': predictions[1]})

    return app
    

    
